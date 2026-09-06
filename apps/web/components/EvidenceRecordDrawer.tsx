"use client";

import { useEffect } from "react";

import type { EvidenceRecord } from "./evidenceTypes";

type EvidenceRecordDrawerProps = {
  record: EvidenceRecord | null;
  patientId: string;
  onClose: () => void;
};

export default function EvidenceRecordDrawer({
  record,
  patientId,
  onClose,
}: EvidenceRecordDrawerProps) {
  useEffect(() => {
    if (!record) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [record, onClose]);

  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close evidence drawer"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/25"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white p-8 shadow-2xl animate-[drawerIn_320ms_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
              Evidence record
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {record.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {record.date}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Summary
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-700">
            {record.summary}
          </p>
        </div>

        {record.sourceFiles.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Source record
            </p>

            <div className="mt-3 space-y-4">
              {record.sourceFiles.map((sourceFile) => (
                <div
                  key={sourceFile}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm text-slate-600">
                    {sourceFile}
                  </p>

                  <a
                    href={`/patients/${patientId}/evidence/source?source=${encodeURIComponent(
                      sourceFile
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
                  >
                    Open original source →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}