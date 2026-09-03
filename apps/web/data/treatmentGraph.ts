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
  | "used-as"
  | "monitored-by"
  | "documented-in";

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

  return {
    nodes,
    edges: [],
  };
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
  const groups = new Map<
    string,
    TreatmentNode[]
  >();

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

        role: getAggregateRole(instances),

        totalFixedDurationDays,
        fixedDurationInstanceCount,

        hasOpenEndedRecord,
        hasSosRecord,
        hasEmergencyRecord,

        sourceRecordCount: instances.length,

        instances: [...instances].sort((a, b) =>
          (b.prescribedOn ?? "").localeCompare(
            a.prescribedOn ?? ""
          )
        ),
      };
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