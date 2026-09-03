"use client";

import { useState } from "react";

type TreatmentRecord = {
  name: string;
  activeIngredient?: string;
  dose: string;
  frequency: string;
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

  const [selectedRecord, setSelectedRecord] =
    useState<number | null>(null);

  const selected =
    selectedRecord !== null
      ? sortedRecords[selectedRecord]
      : null;

  const selectedAccent =
    selected !== null
      ? getTreatmentAccent(selected)
      : "slate";

  return (
    <div className="mx-auto max-w-5xl">
      <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-slate-500">
        Tap a treatment paw to explore its documented record.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {sortedRecords.map((record, index) => {
          const isSelected = selectedRecord === index;
          const accent = getTreatmentAccent(record);

          return (
            <button
              key={`${record.name}-${record.prescribedOn ?? "unknown"}-${index}`}
              type="button"
              onClick={() =>
                setSelectedRecord(
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
                  "flex h-16 w-16 items-center justify-center rounded-full border-2 text-2xl shadow-sm transition duration-200",
                  "group-hover:-translate-y-1 group-hover:scale-105",
                  getPawClass(accent, isSelected),
                ].join(" ")}
              >
                🐾
              </div>

              <p className="mt-3 text-sm font-semibold leading-5 text-slate-900">
                {record.name}
              </p>

              <p className="mt-1 text-xs leading-4 text-slate-500">
                {record.prescribedOn ?? "Date unknown"}
              </p>
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className={[
            "mx-auto mt-12 max-w-3xl rounded-3xl border p-6 shadow-sm",
            getDetailCardClass(selectedAccent),
          ].join(" ")}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
                {selected.prescribedOn ?? "Date not documented"}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {selected.name}
              </h3>

              {selected.activeIngredient && (
                <p className="mt-2 text-sm text-slate-500">
                  Active ingredient:{" "}
                  {selected.activeIngredient}
                </p>
              )}
            </div>

            {selected.status && (
              <span
                className={[
                  "rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-600",
                  getStatusClass(selectedAccent),
                ].join(" ")}
              >
                {formatStatus(selected.status)}
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Dose
              </p>

              <p className="mt-2 text-base font-semibold text-slate-900">
                {selected.dose || "Not documented"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Frequency
              </p>

              <p className="mt-2 text-base font-semibold leading-6 text-slate-900">
                {selected.frequency || "Not documented"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedRecord(null)}
            className="mt-6 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            Close treatment record ↑
          </button>
        </div>
      )}
    </div>
  );
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

function getDetailCardClass(
  accent: TreatmentAccent
) {
  if (accent === "orange") {
    return "border-orange-200 bg-orange-50/40";
  }

  if (accent === "blue") {
    return "border-blue-200 bg-blue-50/40";
  }

  if (accent === "amber") {
    return "border-amber-200 bg-amber-50/40";
  }

  if (accent === "sage") {
    return "border-emerald-200 bg-emerald-50/40";
  }

  return "border-slate-200 bg-slate-50";
}

function getStatusClass(
  accent: TreatmentAccent
) {
  if (accent === "orange") {
    return "border-orange-200";
  }

  if (accent === "blue") {
    return "border-blue-200";
  }

  if (accent === "amber") {
    return "border-amber-200";
  }

  if (accent === "sage") {
    return "border-emerald-200";
  }

  return "border-slate-200";
}

function formatStatus(status: string) {
  return status
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}