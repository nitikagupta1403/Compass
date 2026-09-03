"use client";

import { useState } from "react";

import {
  aggregateTreatmentNodes,
  buildTreatmentGraph,
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
  | "amber"
  | "sage"
  | "slate";

export default function TreatmentHistoryView({
  records,
}: TreatmentHistoryViewProps) {
  const sortedRecords = [...records].sort((a, b) =>
    (b.prescribedOn ?? "").localeCompare(a.prescribedOn ?? "")
  );

  const treatmentGraph =
    buildTreatmentGraph(sortedRecords);

  const aggregatedNodes =
    aggregateTreatmentNodes(
      treatmentGraph.nodes
    );

  const [
    selectedNodeIndex,
    setSelectedNodeIndex,
  ] = useState<number | null>(null);

  const selectedNode =
    selectedNodeIndex !== null
      ? aggregatedNodes[selectedNodeIndex]
      : null;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-slate-500">
        Tap a treatment paw to explore its documented record.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {aggregatedNodes.map((node, index) => {
          const isSelected =
            selectedNodeIndex === index;

          const accent =
            getTreatmentAccent({
              name: node.name,
              activeIngredient:
                node.activeIngredient,
              dose: "",
              frequency: "",
            });

          const pawSize =
            getAggregatedTreatmentNodeSize(
              node,
              aggregatedNodes
            );

          return (
            <button
              key={node.id}
              type="button"
              onClick={() =>
                setSelectedNodeIndex(
                  isSelected ? null : index
                )
              }
              className="group flex flex-col items-center text-center"
              style={{
                cursor:
                  'url("/paw-cursor-pink.png") 16 16, pointer',
              }}
            >
              <div
                className={[
                  "flex items-center justify-center rounded-full border-2 text-2xl shadow-sm transition duration-200",
                  "group-hover:-translate-y-1 group-hover:scale-105",
                  getPawClass(
                    accent,
                    isSelected
                  ),
                ].join(" ")}
                style={{
                  width: `${pawSize}px`,
                  height: `${pawSize}px`,
                }}
              >
                🐾
              </div>

              <p className="mt-3 text-sm font-semibold leading-5 text-slate-900">
                {node.name}
              </p>

              <p className="mt-1 text-xs leading-4 text-slate-500">
                {node.sourceRecordCount} documented{" "}
                {node.sourceRecordCount === 1
                  ? "record"
                  : "records"}
              </p>
            </button>
          );
        })}
      </div>

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

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {selectedNode.sourceRecordCount} documented{" "}
              {selectedNode.sourceRecordCount === 1
                ? "record"
                : "records"}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {selectedNode.instances.map(
              (instance) => (
                <div
                  key={instance.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                    {instance.prescribedOn ??
                      "Date not documented"}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Documented duration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {formatDuration(instance)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {formatRole(
                          instance.role
                        )}
                      </p>
                    </div>

                    {instance.status && (
                      <div
                        className={[
                          "rounded-xl border p-4",
                          getStatusCardClass(
                            instance.status
                          ),
                        ].join(" ")}
                      >
                        <p className="text-xs font-medium opacity-70">
                          Status
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {formatStatus(
                            instance.status
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedNodeIndex(null)
            }
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

function getTreatmentAccent(
  record: TreatmentRecord
): TreatmentAccent {
  const text = `${record.name} ${
    record.activeIngredient ?? ""
  }`.toLowerCase();

  if (
    text.includes("gardenal") ||
    text.includes("phenobarbital")
  ) {
    return "orange";
  }

  if (
    text.includes("levetiracetam") ||
    text.includes("epihat") ||
    text.includes("levepil")
  ) {
    return "blue";
  }

  if (
    text.includes("rivotril") ||
    text.includes("clonazepam") ||
    text.includes("medazolam") ||
    text.includes("diamox")
  ) {
    return "amber";
  }

  if (
    text.includes("hepamust") ||
    text.includes("neurokind") ||
    text.includes("et liv") ||
    text.includes("sampet") ||
    text.includes("nervitoss") ||
    text.includes("electrodutch")
  ) {
    return "sage";
  }

  return "slate";
}

function getPawClass(
  accent: TreatmentAccent,
  isSelected: boolean
) {
  if (accent === "orange") {
    return isSelected
      ? "border-orange-400 bg-orange-100 shadow-md"
      : "border-orange-200 bg-orange-50";
  }

  if (accent === "blue") {
    return isSelected
      ? "border-blue-400 bg-blue-100 shadow-md"
      : "border-blue-200 bg-blue-50";
  }

  if (accent === "amber") {
    return isSelected
      ? "border-amber-400 bg-amber-100 shadow-md"
      : "border-amber-200 bg-amber-50";
  }

  if (accent === "sage") {
    return isSelected
      ? "border-emerald-400 bg-emerald-100 shadow-md"
      : "border-emerald-200 bg-emerald-50";
  }

  return isSelected
    ? "border-slate-400 bg-slate-100 shadow-md"
    : "border-slate-200 bg-white";
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

function getStatusCardClass(
  status: string
) {
  const value = status
    .trim()
    .toLowerCase();

  if (value.includes("emergency")) {
    return "border-red-300 bg-red-50 text-red-900";
  }

  if (
    value.includes("stop") ||
    value.includes("discontinued")
  ) {
    return "border-rose-300 bg-rose-50 text-rose-900";
  }

  if (
    value.includes("sos") ||
    value.includes("prn") ||
    value.includes("as required")
  ) {
    return "border-amber-300 bg-amber-50 text-amber-900";
  }

  if (
    value.includes("current") ||
    value.includes("ongoing") ||
    value.includes("always")
  ) {
    return "border-orange-300 bg-orange-50 text-orange-900";
  }

  if (
    value.includes("history") ||
    value.includes("historical") ||
    value.includes("past")
    ) {
    return "border-sky-200 bg-sky-50 text-sky-900";
    }

  return "border-slate-200 bg-white text-slate-700";
}