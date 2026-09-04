export type TreatmentRole =
  | "maintenance"
  | "sos"
  | "emergency"
  | "supportive"
  | "unknown";

export type TreatmentNode = {
  id: string;

  name: string;
  activeIngredient?: string;

  role: TreatmentRole;

  documentedDurationDays?: number;
  durationStatus:
    | "fixed"
    | "open-ended"
    | "sos"
    | "unknown";

  prescribedOn?: string;
  status?: string;

  sourceRecordCount: number;
};

    export type TreatmentEdgeType =
        | "same-family"
        | "continued-by"
        | "co-prescribed-with"
        | "monitored-by";

    export type TreatmentEdge = {
        id: string;

        source: string;
        target: string;

        type: TreatmentEdgeType;
        };
    
    export type TreatmentGraph = {
        nodes: TreatmentNode[];
        edges: TreatmentEdge[];
        };
    type TreatmentRecordInput = {
        name: string;
        activeIngredient?: string;
        dose: string;
        frequency: string;
        duration?: string;
        prescribedOn?: string;
        status?: string;
        };

export function buildTreatmentGraph(
    records: TreatmentRecordInput[]
    ): TreatmentGraph {
        const nodes: TreatmentNode[] = records.map((record, index) => {
        const role = inferTreatmentRole(record);
        const duration = inferDocumentedDuration(record);

    return {
      id: `treatment-${index + 1}`,
      name: record.name,
      activeIngredient: record.activeIngredient,
      role,
      documentedDurationDays: duration.days,
      durationStatus: duration.status,
      prescribedOn: record.prescribedOn,
      status: record.status,
      sourceRecordCount: 1,
    };
  });

  const edges =
    buildTreatmentEdges(nodes);

  return {
    nodes,
    edges,
  };
}

function buildTreatmentEdges(
  nodes: TreatmentNode[]
): TreatmentEdge[] {
  const edges: TreatmentEdge[] = [];

  /*
   * 1. continued-by
   *
   * Same documented medication name,
   * ordered chronologically.
   */
  const byMedication = new Map<
    string,
    TreatmentNode[]
  >();

  for (const node of nodes) {
    const key = node.name
      .trim()
      .toLowerCase();

    const group =
      byMedication.get(key) ?? [];

    group.push(node);

    byMedication.set(key, group);
  }

  for (const medicationNodes of byMedication.values()) {
    const ordered = [...medicationNodes]
      .filter(
        (node) =>
          node.prescribedOn !== undefined
      )
      .sort((a, b) =>
        (a.prescribedOn ?? "").localeCompare(
          b.prescribedOn ?? ""
        )
      );

    for (
      let index = 0;
      index < ordered.length - 1;
      index++
    ) {
      const source = ordered[index];
      const target = ordered[index + 1];

      edges.push({
        id: `continued-${source.id}-${target.id}`,
        source: source.id,
        target: target.id,
        type: "continued-by",
      });
    }
  }

  /*
   * 2. co-prescribed-with
   *
   * Different medications documented
   * on the same prescription date.
   */
  const byDate = new Map<
    string,
    TreatmentNode[]
  >();

  for (const node of nodes) {
    if (!node.prescribedOn) {
      continue;
    }

    const group =
      byDate.get(node.prescribedOn) ?? [];

    group.push(node);

    byDate.set(
      node.prescribedOn,
      group
    );
  }

  for (const dateNodes of byDate.values()) {
    for (
      let i = 0;
      i < dateNodes.length;
      i++
    ) {
      for (
        let j = i + 1;
        j < dateNodes.length;
        j++
      ) {
        const source = dateNodes[i];
        const target = dateNodes[j];

        if (
          source.name
            .trim()
            .toLowerCase() ===
          target.name
            .trim()
            .toLowerCase()
        ) {
          continue;
        }

        edges.push({
          id: `coprescribed-${source.id}-${target.id}`,
          source: source.id,
          target: target.id,
          type: "co-prescribed-with",
        });
      }
    }
  }

  /*
   * 3. same-family
   *
   * Different documented drug names
   * with the same explicit active ingredient.
   */
  for (
    let i = 0;
    i < nodes.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < nodes.length;
      j++
    ) {
      const source = nodes[i];
      const target = nodes[j];

      if (
        !source.activeIngredient ||
        !target.activeIngredient
      ) {
        continue;
      }

      const sameIngredient =
        source.activeIngredient
          .trim()
          .toLowerCase() ===
        target.activeIngredient
          .trim()
          .toLowerCase();

      const differentNames =
        source.name
          .trim()
          .toLowerCase() !==
        target.name
          .trim()
          .toLowerCase();

      if (
        sameIngredient &&
        differentNames
      ) {
        edges.push({
          id: `family-${source.id}-${target.id}`,
          source: source.id,
          target: target.id,
          type: "same-family",
        });
      }
    }
  }

  return edges;
}

function inferTreatmentRole(
  record: TreatmentRecordInput
): TreatmentRole {
  const text = [
    record.name,
    record.activeIngredient,
    record.dose,
    record.frequency,
    record.status,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("emergency") ||
    text.includes("intranasal")
  ) {
    return "emergency";
  }

  if (
    text.includes("sos") ||
    text.includes("prn") ||
    text.includes("as required")
    ) {
    return "sos";
}

  if (
    text.includes("always") ||
    text.includes("daily") ||
    text.includes("morning") ||
    text.includes("night") ||
    text.includes("bid") ||
    text.includes("q8") ||
    text.includes("q12")
  ) {
    return "maintenance";
  }

  return "unknown";
}

function inferDocumentedDuration(
  record: TreatmentRecordInput
): {
  days?: number;
  status: TreatmentNode["durationStatus"];
} {
  const durationText =
    record.duration?.trim().toLowerCase() ?? "";

  const contextText = [
    record.frequency,
    record.status,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    contextText.includes("emergency") ||
    contextText.includes("intranasal")
  ) {
    return {
      status: "unknown",
    };
  }

  if (
    contextText.includes("sos") ||
    contextText.includes("prn") ||
    contextText.includes("as required")
  ) {
    return {
      status: "sos",
    };
  }

  const dayMatch = durationText.match(
    /(\d+)\s*(?:day|days|d)\b/
  );

  if (dayMatch) {
    return {
      days: Number(dayMatch[1]),
      status: "fixed",
    };
  }

  if (
    durationText.includes("always") ||
    durationText.includes("ongoing") ||
    durationText.includes("current")
  ) {
    return {
      status: "open-ended",
    };
  }

  if (
    contextText.includes("always") ||
    contextText.includes("current")
  ) {
    return {
      status: "open-ended",
    };
  }

  return {
    status: "unknown",
  };
}

export function getTreatmentNodeSize(
  node: TreatmentNode,
  nodes: TreatmentNode[]
) {
  const minSize = 52;
  const maxSize = 80;
  const neutralSize = 60;

  if (
    node.durationStatus !== "fixed" ||
    node.documentedDurationDays === undefined
  ) {
    if (node.durationStatus === "open-ended") {
      return neutralSize;
    }

    return minSize;
  }

  const fixedDurations = nodes
    .filter(
      (item) =>
        item.durationStatus === "fixed" &&
        item.documentedDurationDays !== undefined
    )
    .map(
      (item) =>
        item.documentedDurationDays as number
    );

  if (fixedDurations.length === 0) {
    return neutralSize;
  }

  const minDuration = Math.min(...fixedDurations);
  const maxDuration = Math.max(...fixedDurations);

  if (minDuration === maxDuration) {
    return neutralSize;
  }

  const normalized =
    (node.documentedDurationDays - minDuration) /
    (maxDuration - minDuration);

  return (
    minSize +
    normalized * (maxSize - minSize)
  );
}

export type AggregatedTreatmentEdge = {
  id: string;

  source: string;
  target: string;

  type:
    | "co-prescribed-with"
    | "same-family";

  weight: number;

  dates: string[];
};

export type AggregatedTreatmentNode = {
  id: string;

  name: string;
  activeIngredient?: string;

  role: TreatmentRole;

  totalFixedDurationDays: number;
  fixedDurationInstanceCount: number;

  hasOpenEndedRecord: boolean;
  hasSosRecord: boolean;
  hasEmergencyRecord: boolean;

  sourceRecordCount: number;

  instances: TreatmentNode[];
};

export function aggregateTreatmentNodes(
  nodes: TreatmentNode[]
): AggregatedTreatmentNode[] {
  const groups = new Map<string, TreatmentNode[]>();

  for (const node of nodes) {
    const key = getMedicationIdentityKey(node);

    const existing = groups.get(key) ?? [];

        existing.push(node);
        groups.set(key, existing);
    }

    return Array.from(groups.entries()).map(
        ([key, instances]) => {
        const totalFixedDurationDays =
            instances.reduce(
            (sum, node) =>
                node.durationStatus === "fixed" &&
                node.documentedDurationDays !== undefined
                ? sum + node.documentedDurationDays
                : sum,
            0
            );

        const fixedDurationInstanceCount =
            instances.filter(
            (node) =>
                node.durationStatus === "fixed" &&
                node.documentedDurationDays !== undefined
            ).length;

        const hasOpenEndedRecord =
            instances.some(
            (node) =>
                node.durationStatus === "open-ended"
            );

        const hasSosRecord =
            instances.some(
            (node) =>
                node.durationStatus === "sos"
            );

        const hasEmergencyRecord =
            instances.some(
            (node) =>
                node.role === "emergency"
            );

        const primary = instances[0];

        return {
            id: `treatment-group-${key}`,

            name: primary.name,

            activeIngredient:
            primary.activeIngredient,

            role:
            getAggregateRole(instances),

            totalFixedDurationDays,
            fixedDurationInstanceCount,

            hasOpenEndedRecord,
            hasSosRecord,
            hasEmergencyRecord,

            sourceRecordCount:
            instances.length,

            instances:
            [...instances].sort((a, b) =>
                (b.prescribedOn ?? "").localeCompare(
                a.prescribedOn ?? ""
                )
            ),
        };
        }
    );
    }

export function aggregateTreatmentEdges(
  graph: TreatmentGraph,
  aggregatedNodes: AggregatedTreatmentNode[]
): AggregatedTreatmentEdge[] {
  const medicationNodeByInstanceId =
        new Map<string, AggregatedTreatmentNode>();

    for (const aggregatedNode of aggregatedNodes) {
        for (const instance of aggregatedNode.instances) {
        medicationNodeByInstanceId.set(
            instance.id,
            aggregatedNode
        );
        }
    }

    const groupedEdges = new Map<
        string,
        AggregatedTreatmentEdge
    >();

    for (const edge of graph.edges) {
        if (
        edge.type !== "co-prescribed-with" &&
        edge.type !== "same-family"
        ) {
        continue;
        }

        const sourceMedication =
        medicationNodeByInstanceId.get(
            edge.source
        );

        const targetMedication =
        medicationNodeByInstanceId.get(
            edge.target
        );

        if (
        !sourceMedication ||
        !targetMedication
        ) {
        continue;
        }

        if (
        sourceMedication.id ===
        targetMedication.id
        ) {
        continue;
        }

        const [sourceId, targetId] =
        [sourceMedication.id, targetMedication.id]
            .sort();

        const key =
        `${edge.type}:${sourceId}:${targetId}`;

        const existing =
        groupedEdges.get(key);

        const sourceInstance =
        graph.nodes.find(
            (node) => node.id === edge.source
        );

        const targetInstance =
        graph.nodes.find(
            (node) => node.id === edge.target
        );

        const date =
        edge.type === "co-prescribed-with"
            ? sourceInstance?.prescribedOn ??
            targetInstance?.prescribedOn
            : undefined;

        if (existing) {
        if (
            date &&
            !existing.dates.includes(date)
        ) {
            existing.dates.push(date);
            existing.weight =
            existing.dates.length;
        }

        continue;
        }

        groupedEdges.set(key, {
        id: `aggregated-${key}`,
        source: sourceId,
        target: targetId,
        type: edge.type,
        weight:
            edge.type === "co-prescribed-with"
            ? date
                ? 1
                : 0
            : 1,
        dates: date ? [date] : [],
        });
    }

    return Array.from(
        groupedEdges.values()
    ).map((edge) => ({
        ...edge,
        dates: [...edge.dates].sort(),
    }));
    }

export type TreatmentAdjacency = {
  nodeIds: string[];
  matrix: number[][];
};

export function buildTreatmentAdjacency(
  nodes: AggregatedTreatmentNode[],
  edges: AggregatedTreatmentEdge[],
  sameFamilyAffinity = 2
): TreatmentAdjacency {
  const nodeIds = nodes.map((node) => node.id);

  const indexByNodeId = new Map<string, number>();

  nodeIds.forEach((id, index) => {
    indexByNodeId.set(id, index);
  });

  const matrix = Array.from(
    { length: nodeIds.length },
    () =>
      Array<number>(nodeIds.length).fill(0)
  );

  for (const edge of edges) {
    const sourceIndex =
      indexByNodeId.get(edge.source);

    const targetIndex =
      indexByNodeId.get(edge.target);

    if (
      sourceIndex === undefined ||
      targetIndex === undefined
    ) {
      continue;
    }

    const affinity =
      edge.type === "co-prescribed-with"
        ? edge.weight
        : sameFamilyAffinity;

    matrix[sourceIndex][targetIndex] +=
      affinity;

    matrix[targetIndex][sourceIndex] +=
      affinity;
  }

  return {
    nodeIds,
    matrix,
  };
}

export type TreatmentNodeStrength = {
  nodeId: string;
  strength: number;
};

export function calculateTreatmentNodeStrength(
  adjacency: TreatmentAdjacency
): TreatmentNodeStrength[] {
  return adjacency.nodeIds.map(
    (nodeId, index) => ({
      nodeId,
      strength:
        adjacency.matrix[index].reduce(
          (sum, value) => sum + value,
          0
        ),
    })
  );
}

export type TreatmentClusterAssignment = {
  nodeId: string;
  clusterId: number;
};

export type TreatmentCommunityAssignment = {
  nodeId: string;
  communityId: number;
};

export function clusterTreatmentGraphByModularity(
    adjacency: TreatmentAdjacency,
    maxIterations = 50
    ): TreatmentCommunityAssignment[] {
    const n = adjacency.nodeIds.length;

    const strengths = adjacency.matrix.map((row) =>
        row.reduce((sum, value) => sum + value, 0)
    );

    const totalWeight =
        strengths.reduce(
        (sum, value) => sum + value,
        0
        ) / 2;

    if (totalWeight === 0) {
        return adjacency.nodeIds.map(
        (nodeId, index) => ({
            nodeId,
            communityId: index,
        })
        );
    }

    let communities = Array.from(
        { length: n },
        (_, index) => index
    );

    for (
        let iteration = 0;
        iteration < maxIterations;
        iteration++
    ) {
        let changed = false;

        for (
        let nodeIndex = 0;
        nodeIndex < n;
        nodeIndex++
        ) {
        const currentCommunity =
            communities[nodeIndex];

        const candidateCommunities =
            new Set<number>();

        for (
            let neighborIndex = 0;
            neighborIndex < n;
            neighborIndex++
        ) {
            if (
            adjacency.matrix[nodeIndex][
                neighborIndex
            ] > 0
            ) {
            candidateCommunities.add(
                communities[neighborIndex]
            );
            }
        }

        candidateCommunities.add(
            currentCommunity
        );

        let bestCommunity =
            currentCommunity;

        let bestModularity =
            calculateModularity(
            adjacency.matrix,
            strengths,
            communities,
            totalWeight
            );

        for (
            const candidate of candidateCommunities
        ) {
            if (
            candidate === currentCommunity
            ) {
            continue;
            }

            const trialCommunities =
            [...communities];

            trialCommunities[nodeIndex] =
            candidate;

            const trialModularity =
            calculateModularity(
                adjacency.matrix,
                strengths,
                trialCommunities,
                totalWeight
            );

            if (
            trialModularity >
            bestModularity + 1e-9
            ) {
            bestModularity =
                trialModularity;

            bestCommunity =
                candidate;
            }
        }

        if (
            bestCommunity !==
            currentCommunity
        ) {
            communities[nodeIndex] =
            bestCommunity;

            changed = true;
        }
        }

        if (!changed) {
        break;
        }
    }

    const normalized =
        normalizeCommunityIds(
        communities
        );

    return adjacency.nodeIds.map(
        (nodeId, index) => ({
        nodeId,
        communityId:
            normalized[index],
        })
    );
    }

    export type TreatmentGraphPosition = {
    nodeId: string;
    x: number;
    y: number;
    };

    export function buildCommunityLayout(
    nodes: AggregatedTreatmentNode[],
    communities: TreatmentCommunityAssignment[]
    ): TreatmentGraphPosition[] {
    const communityMap =
        new Map<
        number,
        AggregatedTreatmentNode[]
        >();

    for (const assignment of communities) {
        const node = nodes.find(
        (item) =>
            item.id === assignment.nodeId
        );

        if (!node) {
        continue;
        }

        const group =
        communityMap.get(
            assignment.communityId
        ) ?? [];

        group.push(node);

        communityMap.set(
        assignment.communityId,
        group
        );
    }

    const communityIds =
        Array.from(
        communityMap.keys()
        ).sort(
        (a, b) => a - b
        );

    const centers = [
        { x: 25, y: 30 },
        { x: 72, y: 28 },
        { x: 36, y: 72 },
        { x: 76, y: 72 },
    ];

    const positions:
        TreatmentGraphPosition[] = [];

    communityIds.forEach(
        (
        communityId,
        communityIndex
        ) => {
        const group =
            communityMap.get(
            communityId
            ) ?? [];

        const center =
            centers[
            communityIndex %
                centers.length
            ];

        const radius =
            group.length <= 2
            ? 9
            : group.length <= 4
                ? 13
                : 16;

        group.forEach(
            (node, nodeIndex) => {
            if (
                group.length === 1
            ) {
                positions.push({
                nodeId: node.id,
                x: center.x,
                y: center.y,
                });

                return;
            }

            const angle =
                (2 *
                Math.PI *
                nodeIndex) /
                group.length -
                Math.PI / 2;

            positions.push({
                nodeId: node.id,

                x:
                center.x +
                radius *
                    Math.cos(angle),

                y:
                center.y +
                radius *
                    Math.sin(angle),
            });
            }
        );
        }
    );

    return positions;
    }

function calculateModularity(
  matrix: number[][],
  strengths: number[],
  communities: number[],
  totalWeight: number
) {
  let score = 0;

  const denominator =
    2 * totalWeight;

  for (
    let i = 0;
    i < matrix.length;
    i++
  ) {
    for (
      let j = 0;
      j < matrix.length;
      j++
    ) {
      if (
        communities[i] !==
        communities[j]
      ) {
        continue;
      }

      const expected =
        (strengths[i] *
          strengths[j]) /
        denominator;

      score +=
        matrix[i][j] -
        expected;
    }
  }

  return score / denominator;
}

function normalizeCommunityIds(
  communities: number[]
) {
  const mapping =
    new Map<number, number>();

  let nextId = 0;

  return communities.map(
    (community) => {
      if (
        !mapping.has(community)
      ) {
        mapping.set(
          community,
          nextId++
        );
      }

      return mapping.get(
        community
      )!;
    }
  );
}

function getMedicationIdentityKey(
  node: TreatmentNode
) {
  return node.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function getAggregateRole(
    nodes: TreatmentNode[]
    ): TreatmentRole {
    if (
        nodes.some(
        (node) => node.role === "emergency"
        )
    ) {
        return "emergency";
    }

    if (
        nodes.some(
        (node) => node.role === "maintenance"
        )
    ) {
        return "maintenance";
    }

    if (
        nodes.some((node) => node.role === "sos")
    ) {
        return "sos";
    }

    if (
        nodes.some(
        (node) => node.role === "supportive"
        )
    ) {
        return "supportive";
    }

    return "unknown";
    }

export function getAggregatedTreatmentNodeSize(
  node: AggregatedTreatmentNode,
  nodes: AggregatedTreatmentNode[]
) {
  const minSize = 54;
  const maxSize = 90;
  const neutralSize = 62;

  if (node.totalFixedDurationDays <= 0) {
    return neutralSize;
  }

  const durations = nodes
    .map((item) => item.totalFixedDurationDays)
    .filter((days) => days > 0);

  if (durations.length === 0) {
    return neutralSize;
  }

  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);

  if (minDuration === maxDuration) {
    return neutralSize;
  }

  const normalized =
    (node.totalFixedDurationDays - minDuration) /
    (maxDuration - minDuration);

  return (
    minSize +
    normalized * (maxSize - minSize)
  );
}