"use client";

import { useState } from "react";

import {
  aggregateTreatmentEdges,
  aggregateTreatmentNodes,
  buildTreatmentAdjacency,
  buildTreatmentGraph,
  calculateTreatmentNodeStrength, 
  clusterTreatmentGraphByModularity,
  buildCommunityLayout,
  getAggregatedTreatmentNodeSize,
} from "../data/treatmentGraph";

type TreatmentRecord = {
  name: string;
  activeIngredient?: string;
  dose: string;
  frequency: string;
  duration?: string;
  prescribedOn?: string;
  status?: string;
};

type TreatmentHistoryViewProps = {
  records: TreatmentRecord[];
};

type TreatmentAccent =
  | "orange"
  | "blue"
  | "emerald"
  | "violet"
  | "slate";

  
export default function TreatmentHistoryView({
  records,
}: TreatmentHistoryViewProps) {

  const [timeFilter, setTimeFilter] =
    useState<"all" | "2025" | "2026">("all");

  const filteredRecords =
      timeFilter === "all"
        ? records
        : records.filter((record) =>
            record.prescribedOn?.startsWith(timeFilter)
          );

    const sortedRecords = [...filteredRecords].sort((a, b) =>
      (b.prescribedOn ?? "").localeCompare(a.prescribedOn ?? "")
    );

    const treatmentGraph =
      buildTreatmentGraph(sortedRecords);

    const aggregatedNodes =
      aggregateTreatmentNodes(
        treatmentGraph.nodes
      );

    const aggregatedEdges =
      aggregateTreatmentEdges(
        treatmentGraph,
        aggregatedNodes
      );

    const adjacency =
      buildTreatmentAdjacency(
          aggregatedNodes,
          aggregatedEdges
      );

    const nodeStrengths =
      calculateTreatmentNodeStrength(
          adjacency
      );
    
      const communities =
          clusterTreatmentGraphByModularity(
              adjacency
      );

    const graphPositions =
        buildCommunityLayout(
            aggregatedNodes,
            communities
        );

    const [
      selectedNodeIndex,
      setSelectedNodeIndex,
    ] = useState<number | null>(null);

    const [viewMode, setViewMode] =
      useState<"graph" | "matrix">("graph");

    const [
      selectedMatrixPair,
      setSelectedMatrixPair,
      ] = useState<{
      rowId: string;
      columnId: string;
      } | null>(null);

    const [
      showAllRelationships,
      setShowAllRelationships,
      ] = useState(false);

    const selectedNode =
      selectedNodeIndex !== null
        ? aggregatedNodes[selectedNodeIndex]
        : null;

    const selectedRelationships =
      selectedNode
          ? aggregatedEdges
              .filter(
              (edge) =>
                  edge.source === selectedNode.id ||
                  edge.target === selectedNode.id
              )
              .map((edge) => {
              const neighborId =
                  edge.source === selectedNode.id
                  ? edge.target
                  : edge.source;

            const neighbor =
                aggregatedNodes.find(
                (node) =>
                    node.id === neighborId
                );

          return {
            neighborName:
              neighbor?.name ?? neighborId,
            type: edge.type,
            weight: edge.weight,
            dates: edge.dates,
          };
        })
        .sort((a, b) => {
          if (
            a.type === "same-family" &&
            b.type !== "same-family"
          ) {
            return -1;
          }

          if (
            b.type === "same-family" &&
            a.type !== "same-family"
          ) {
            return 1;
          }

          return b.weight - a.weight;
        })
    : [];

  return (

    <div className="mx-auto max-w-5xl">
        <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-slate-500">
        Explore Hope&apos;s documented treatment history.
        </p>

        <div className="mt-5 flex justify-center">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              aria-pressed={viewMode === "graph"}
              onClick={() => {
                setViewMode("graph");
              }}
              className={[
                  "rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2",
                  viewMode === "graph"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800",
              ].join(" ")}
              >
              Graph
              </button>

              <button
                type="button"
                aria-pressed={viewMode === "matrix"}
                onClick={() => {
                  setViewMode("matrix");
                  setShowAllRelationships(false);
                }}
                className={[
                    "rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2",
                    viewMode === "matrix"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800",
                ].join(" ")}
                >
                Matrix
                </button>
            </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                {(["all", "2025", "2026"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={timeFilter === value}
                    onClick={() => {
                      setTimeFilter(value);
                      setSelectedNodeIndex(null);
                      setSelectedMatrixPair(null);
                      setShowAllRelationships(false);
                    }}
                    className={[
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2",
                      timeFilter === value
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    ].join(" ")}
                  >
                    {value === "all" ? "All" : value}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 text-center text-xs font-medium text-slate-500">
              {timeFilter === "all" ? "All documented periods" : timeFilter}
              {" · "}
              {aggregatedNodes.length} treatments
              {" · "}
              {aggregatedEdges.length} documented relationships
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                  <span className="block h-[2px] w-8 bg-slate-400" />
                  <span>Co-prescribed</span>
              </div>

              <div className="flex items-center gap-2">
                  <span className="block w-8 border-t-2 border-dashed border-slate-400" />
                  <span>Same medication family</span>
              </div>

              <div className="flex items-center gap-2">
                  <span className="block h-[4px] w-8 bg-slate-400" />
                  <span>More shared prescription dates</span>
              </div>
          </div>

          {viewMode === "graph" &&
            selectedMatrixPair &&
            (() => {
              const rowNode = aggregatedNodes.find(
                (node) =>
                  node.id === selectedMatrixPair.rowId
              );

              const columnNode = aggregatedNodes.find(
                (node) =>
                  node.id === selectedMatrixPair.columnId
              );

              if (!rowNode || !columnNode) {
                return null;
              }

              return (
                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                    Focused relationship:{" "}
                    <span className="font-semibold text-slate-900">
                      {rowNode.name}
                    </span>

                    <span className="mx-2 text-slate-400">
                      ↔
                    </span>

                    <span className="font-semibold text-slate-900">
                      {columnNode.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMatrixPair(null)
                    }
                    className="text-xs font-semibold text-teal-800 hover:underline"
                  >
                    Clear focus
                  </button>
                </div>
              );
            })()}

          {viewMode === "graph" && (
            <div className="relative mt-10 h-[720px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">

        {/* EDGES */}
        <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            {aggregatedEdges.map((edge) => {
                const source =
                graphPositions.find(
                    (position) =>
                    position.nodeId === edge.source
                );

            const target =
                graphPositions.find(
                    (position) =>
                    position.nodeId === edge.target
                );

            if (!source || !target) {
                return null;
                }

        const selectedNodeId =
          selectedNodeIndex !== null
            ? aggregatedNodes[selectedNodeIndex]?.id
            : null;

      const touchesSelected =
        selectedNodeId === edge.source ||
        selectedNodeId === edge.target;

      const isMatrixPairEdge =
        selectedMatrixPair
          ? (edge.source === selectedMatrixPair.rowId &&
              edge.target === selectedMatrixPair.columnId) ||
            (edge.target === selectedMatrixPair.rowId &&
              edge.source === selectedMatrixPair.columnId)
          : false;

      const strokeWidth =
        edge.type === "same-family"
          ? 0.35
          : 0.25 + edge.weight * 0.18;

            return (
                <line
                    key={edge.id}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}

                    stroke={
                      isMatrixPairEdge
                        ? "#475569"
                        : selectedNodeId && touchesSelected
                        ? "#64748b"
                        : edge.type === "same-family"
                        ? "#94a3b8"
                        : "#cbd5e1"
                    }
                strokeWidth={strokeWidth}
                strokeDasharray={
                    edge.type === "same-family"
                        ? "1.2 1.2"
                        : undefined
                    }
                opacity={
                  isMatrixPairEdge
                    ? 1
                    : selectedNodeId
                    ? touchesSelected
                      ? 1
                      : 0.12
                    : selectedMatrixPair
                    ? 0.12
                    : edge.type === "same-family"
                    ? 0.9
                    : 0.7
                }
                />
                );
            })}
            </svg>

    {/* PAW NODES */}
    {aggregatedNodes.map((node, index) => {
        const position =
        graphPositions.find(
            (item) =>
            item.nodeId === node.id
        );

        if (!position) {
        return null;
        }

        const isSelected =
          selectedNodeIndex === index;

        const isMatrixPairNode =
          selectedMatrixPair
            ? node.id === selectedMatrixPair.rowId ||
              node.id === selectedMatrixPair.columnId
            : false;

        const selectedNodeId =
            selectedNodeIndex !== null
                ? aggregatedNodes[selectedNodeIndex]?.id
                : null;

        const isNeighbor =
            selectedNodeId
                ? aggregatedEdges.some(
                    (edge) =>
                    (edge.source === selectedNodeId &&
                        edge.target === node.id) ||
                    (edge.target === selectedNodeId &&
                        edge.source === node.id)
                )
                : false;

        const nodeOpacity =
            selectedNodeId
                ? isSelected || isNeighbor
                ? 1
                : 0.5
                : 1;

        const community =
            communities.find(
                (assignment) =>
                assignment.nodeId === node.id
            );

        const accent =
            getCommunityAccent(
                community?.communityId
            );

        const pawSize =
            getAggregatedTreatmentNodeSize(
                node,
                aggregatedNodes
            );

          return (
            <button
              key={node.id}
              type="button"
              aria-label={`${node.name}, ${node.sourceRecordCount} documented ${
                node.sourceRecordCount === 1 ? "record" : "records"
              }`}
              onClick={() => {
                      setSelectedNodeIndex(
                      isSelected ? null : index
                    );

                    setSelectedMatrixPair(null);
                    setShowAllRelationships(false);
                  }}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded-full"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                opacity: nodeOpacity,
                cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
        >
         <div
            className={[
                "flex items-center justify-center rounded-full border-2 text-2xl shadow-sm transition duration-200",
                "hover:scale-110",
            getPawClass(
              accent,
              isSelected || isMatrixPairNode
            ),
                isSelected || isMatrixPairNode
                    ? "ring-2 ring-slate-500 ring-offset-2"
                    : "",
                ].join(" ")}
            style={{
                width: `${pawSize}px`,
                height: `${pawSize}px`,
            }}
            >
            <div className="flex items-center gap-1">
                <span className="text-xl">🐾</span>

                <span className="text-xs font-semibold text-slate-700">
                    ×{node.sourceRecordCount}
                </span>
            </div>
        </div>

        <p className="mt-2 max-w-[120px] text-xs font-semibold leading-4 text-slate-900">
            {node.name}
        </p>
        </button>
        );
    })}
    </div>
)}

    {viewMode === "matrix" && (
    <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6">
        <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            Treatment Relationship Matrix
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-500">
            Numbers represent distinct shared prescription dates.
            Family marks the same documented medication family.
        </p>
        </div>

        <table className="min-w-max border-collapse text-xs">
        <thead>
            <tr>
            <th className="sticky left-0 z-20 border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-700">
                Treatment
            </th>
        {aggregatedNodes.map((node) => {
            const community =
                communities.find(
                (assignment) =>
                    assignment.nodeId === node.id
                );

        const accent =
            getCommunityAccent(
                community?.communityId
                );

        return (
            <th
            key={node.id}
            className={[
              "border px-3 py-2 text-center font-semibold",
              getMatrixHeaderClass(accent),
              selectedNode?.id === node.id
                ? "ring-2 ring-inset ring-slate-500"
                : "",
            ].join(" ")}
            >
        <div className="max-w-[110px] whitespace-normal leading-4">
            {node.name}
        </div>
        </th>
        );
    })}
    </tr>
    </thead>

      <tbody>
        {aggregatedNodes.map((rowNode) => (
          <tr key={rowNode.id}>

        {(() => {
            const community =
                communities.find(
                (assignment) =>
                    assignment.nodeId === rowNode.id
                );

            const accent =
                getCommunityAccent(
                community?.communityId
                );

            return (
                <th
                className={[
                    "sticky left-0 z-10 border px-3 py-2 text-left font-semibold",
                    getMatrixHeaderClass(accent),
                    selectedNode?.id === rowNode.id
                      ? "ring-2 ring-inset ring-slate-500"
                      : "",
                  ].join(" ")}
                >
                {rowNode.name}
                </th>
            );
            })()}

        {aggregatedNodes.map((columnNode) => {
            if (rowNode.id === columnNode.id) {
                return (
                <td
                    key={columnNode.id}
                    className="border border-slate-200 bg-slate-100 px-3 py-3 text-center text-slate-400"
                >
                    —
                </td>
                );
            }

            const relations = aggregatedEdges.filter(
                (edge) =>
                (edge.source === rowNode.id &&
                    edge.target === columnNode.id) ||
                (edge.target === rowNode.id &&
                    edge.source === columnNode.id)
            );

            const familyRelation =
                relations.find(
                (edge) =>
                    edge.type === "same-family"
                );

            const coPrescriptionRelation =
                relations.find(
                (edge) =>
                    edge.type ===
                    "co-prescribed-with"
                );

            const rowCommunity =
                communities.find(
                (assignment) =>
                    assignment.nodeId === rowNode.id
                );

            const columnCommunity =
                communities.find(
                (assignment) =>
                    assignment.nodeId === columnNode.id
                );

            const sameCommunity =
                rowCommunity?.communityId !== undefined &&
                rowCommunity.communityId ===
                columnCommunity?.communityId;

            const cellAccent =
                getCommunityAccent(
                rowCommunity?.communityId
                );

            return (
                <td
                key={columnNode.id}
                className={[
                    "border border-slate-200 p-0 text-center",
                    getMatrixCellClass(
                    cellAccent,
                    sameCommunity
                    ),
                ].join(" ")}
                >
                <button
                  type="button"
                  aria-label={
                    familyRelation
                      ? `${rowNode.name} and ${columnNode.name}, same documented medication family`
                      : coPrescriptionRelation
                      ? `${rowNode.name} and ${columnNode.name}, ${coPrescriptionRelation.weight} shared prescription ${
                          coPrescriptionRelation.weight === 1 ? "date" : "dates"
                        }`
                      : `${rowNode.name} and ${columnNode.name}, no documented relationship`
                  }
                  onClick={() => {
                      setSelectedNodeIndex(null);

                      setSelectedMatrixPair((current) =>
                        current?.rowId === rowNode.id &&
                        current?.columnId === columnNode.id
                          ? null
                          : {
                              rowId: rowNode.id,
                              columnId: columnNode.id,
                            }
                      );
                    }}
                    
                    className={[
                    "h-full w-full px-3 py-3 transition",
                    selectedMatrixPair?.rowId ===
                        rowNode.id &&
                    selectedMatrixPair?.columnId ===
                        columnNode.id
                        ? "ring-2 ring-inset ring-slate-500"
                        : "hover:bg-slate-50/70",
                    ].join(" ")}
                >
                    {familyRelation ? (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        Family
                    </span>
                    ) : coPrescriptionRelation ? (
                    <span className="font-semibold text-slate-800">
                        {
                        coPrescriptionRelation.weight
                        }
                    </span>
                    ) : (
                    <span className="text-slate-300">
                        ·
                    </span>
                    )}
                </button>
                </td>
            );
            })}
        </tr>
        ))}
        </tbody>
        </table>

        {selectedMatrixPair && (() => {
  const rowNode = aggregatedNodes.find(
    (node) =>
      node.id === selectedMatrixPair.rowId
  );

  const columnNode = aggregatedNodes.find(
    (node) =>
      node.id === selectedMatrixPair.columnId
  );

  const relations = aggregatedEdges.filter(
    (edge) =>
      (edge.source === selectedMatrixPair.rowId &&
        edge.target === selectedMatrixPair.columnId) ||
      (edge.target === selectedMatrixPair.rowId &&
        edge.source === selectedMatrixPair.columnId)
  );

  const familyRelation = relations.find(
    (edge) =>
      edge.type === "same-family"
  );

  const coPrescriptionRelation = relations.find(
    (edge) =>
      edge.type === "co-prescribed-with"
  );

  if (!rowNode || !columnNode) {
    return null;
  }

  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            Selected relationship
          </p>

          <h4 className="mt-2 text-lg font-bold text-slate-900">
            {rowNode.name}
            <span className="mx-2 text-slate-400">
              ↔
            </span>
            {columnNode.name}
          </h4>
        </div>

        <button
          type="button"
          onClick={() =>
            setSelectedMatrixPair(null)
          }
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {familyRelation && (
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">
              Relationship type
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              Same documented medication family
            </p>
          </div>
        )}

        {coPrescriptionRelation && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">
                Shared prescription dates
                </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
                {coPrescriptionRelation.weight}
            </p>

            {coPrescriptionRelation.dates.length > 0 && (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                    {coPrescriptionRelation.dates.join(" · ")}
                </p>
            )}
        </div>
        )}
    </div>

        {!familyRelation &&
            !coPrescriptionRelation && (
            <p className="mt-4 text-sm text-slate-500">
                No documented relationship between these treatments.
            </p>
            )}
        </div>
    );
    })()}
    </div>
    )}

      {selectedNode && (
  <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
          Treatment history
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          {selectedNode.name}
        </h3>

        {selectedNode.activeIngredient && (
          <p className="mt-2 text-sm text-slate-500">
            Active ingredient:{" "}
            {selectedNode.activeIngredient}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          {selectedNode.sourceRecordCount} documented{" "}
          {selectedNode.sourceRecordCount === 1
            ? "record"
            : "records"}
        </span>

        <a
          href={`/patients/HOPE-001/evidence?treatment=${encodeURIComponent(
          selectedNode.name
        )}`}
          className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Open evidence index →
        </a>
      </div>
    </div>

    {selectedRelationships.length > 0 && (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          Graph relationships
        </p>

        <div className="mt-3 space-y-2">
            {(showAllRelationships
                ? selectedRelationships
                : selectedRelationships.slice(0, 3)
            ).map((relationship) => (
        <div
            key={`${relationship.neighborName}-${relationship.type}`}
            className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
        >
        <span className="mr-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            {relationship.type === "same-family"
            ? "Family"
            : `Weight ${relationship.weight}`}
        </span>

        <p className="mt-2 text-sm leading-6 text-slate-600">
            Connected to{" "}
            <span className="font-semibold text-slate-900">
            {relationship.neighborName}
            </span>{" "}
            through{" "}
            {relationship.type === "same-family"
            ? "the same documented medication family"
            : `${relationship.weight} shared prescription ${
                relationship.weight === 1
                    ? "date"
                    : "dates"
                }`}
            .
        </p>

        {relationship.type ===
            "co-prescribed-with" &&
            relationship.dates.length > 0 && (
            <p className="mt-1 text-xs text-slate-500">
                {relationship.dates.join(" · ")}
            </p>
            )}
        </div>
    ))}

    {selectedRelationships.length > 3 && (
        <button
        type="button"
        onClick={() =>
            setShowAllRelationships(
            (current) => !current
            )
        }
        className="mt-2 text-sm font-semibold text-teal-800 hover:underline"
        >
        {showAllRelationships
            ? "Show fewer relationships ↑"
            : `Show all ${selectedRelationships.length} relationships ↓`}
        </button>
)}
</div>
</div>
)}

<div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
  <div className="border-b border-slate-200 px-4 py-3">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
      Documented treatment history
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Date
          </th>

          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Duration
          </th>

          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Role
          </th>

          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
            {selectedNode.instances.map(
                (instance) => (
                    <tr
                    key={instance.id}
                    className="hover:bg-slate-50/70"
                    >
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-teal-800">
                        {instance.prescribedOn ??
                        "Not documented"}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                        {formatDuration(instance)}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                        {formatRole(instance.role)}
                    </td>

                    <td className="px-4 py-3">
                        {instance.status ? (
                        <span
                            className={[
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                            getStatusBadgeClass(
                                instance.status
                            ),
                            ].join(" ")}
                        >
                            {formatStatus(
                            instance.status
                            )}
                        </span>
                        ) : (
                        <span className="text-slate-400">
                            —
                        </span>
                        )}
                    </td>
                    </tr>
                )
                )}
            </tbody>
            </table>
        </div>
        </div>

    <button
      type="button"
      onClick={() => {
        setSelectedNodeIndex(null);
        setSelectedMatrixPair(null);
        setShowAllRelationships(false);
      }}

      className="mt-6 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      Close treatment history ↑
    </button>
  </div>
)}
    </div>
  );
}

function formatDuration(
  instance: {
    durationStatus: string;
    documentedDurationDays?: number;
    role: string;
  }
) {
  if (
    instance.durationStatus === "fixed" &&
    instance.documentedDurationDays !==
      undefined
  ) {
    return `${instance.documentedDurationDays} days`;
  }

  if (
    instance.durationStatus === "open-ended"
  ) {
    return "Open-ended / current";
  }

  if (
    instance.durationStatus === "sos"
  ) {
    return "SOS / PRN";
  }

  if (instance.role === "emergency") {
    return "Emergency plan";
  }

  return "Not documented";
}

function getCommunityAccent(
  communityId?: number
): TreatmentAccent {
  if (communityId === 0) {
    return "orange";
  }

  if (communityId === 1) {
    return "blue";
  }

  if (communityId === 2) {
    return "emerald";
  }

  if (communityId === 3) {
    return "violet";
  }

  return "slate";
}

function getPawClass(
  accent: TreatmentAccent,
  isSelected: boolean
) {
  if (accent === "orange") {
    return isSelected
      ? "border-orange-500 bg-orange-100 shadow-md"
      : "border-orange-300 bg-orange-50";
  }

  if (accent === "blue") {
    return isSelected
      ? "border-blue-500 bg-blue-100 shadow-md"
      : "border-blue-300 bg-blue-50";
  }

  if (accent === "emerald") {
    return isSelected
      ? "border-emerald-500 bg-emerald-100 shadow-md"
      : "border-emerald-300 bg-emerald-50";
  }

  if (accent === "violet") {
    return isSelected
      ? "border-violet-500 bg-violet-100 shadow-md"
      : "border-violet-300 bg-violet-50";
  }

  return isSelected
    ? "border-slate-500 bg-slate-100 shadow-md"
    : "border-slate-300 bg-white";
}

function formatStatus(status: string) {
  return status
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function formatRole(role: string) {
  if (role === "sos") return "SOS";
  if (role === "prn") return "PRN";

  return role
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function getStatusBadgeClass(
  status: string
) {
  const value = status
    .trim()
    .toLowerCase();

  if (value.includes("emergency")) {
    return "bg-red-100 text-red-800 ring-1 ring-red-200";
  }

  if (
    value.includes("stop") ||
    value.includes("discontinued")
  ) {
    return "bg-rose-100 text-rose-800 ring-1 ring-rose-200";
  }

  if (
    value.includes("sos") ||
    value.includes("prn") ||
    value.includes("as required")
  ) {
    return "bg-amber-100 text-amber-900 ring-1 ring-amber-200";
  }

  if (
    value.includes("current") ||
    value.includes("ongoing") ||
    value.includes("always")
  ) {
    return "bg-orange-100 text-orange-900 ring-1 ring-orange-200";
  }

  if (
    value.includes("history") ||
    value.includes("historical") ||
    value.includes("past")
  ) {
    return "bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200";
  }

  return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
}

function getMatrixHeaderClass(
  accent: TreatmentAccent
) {
  if (accent === "orange") {
    return "border-orange-200 bg-orange-50 text-orange-900";
  }

  if (accent === "blue") {
    return "border-blue-200 bg-blue-50 text-blue-900";
  }

  if (accent === "emerald") {
    return "border-emerald-200 bg-emerald-50 text-emerald-900";
  }

  if (accent === "violet") {
    return "border-violet-200 bg-violet-50 text-violet-900";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getMatrixCellClass(
  accent: TreatmentAccent,
  sameCommunity: boolean
) {
  if (!sameCommunity) {
    return "bg-white";
  }

  if (accent === "orange") {
    return "bg-orange-50/60";
  }

  if (accent === "blue") {
    return "bg-blue-50/60";
  }

  if (accent === "emerald") {
    return "bg-emerald-50/60";
  }

  if (accent === "violet") {
    return "bg-violet-50/60";
  }

  return "bg-slate-50";
}