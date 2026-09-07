"use client";

import { useRef, useState } from "react";

type FirstEventChronologyViewProps = {
  firstEventDate: string | null;

  earlyChronology: {
    id: string;
    occurredAt: string;
    type: string;
    title: string;
    description: string;
    evidence: string[];

    sourceDiscrepancy?: {
      clinicalRecordSummary: string;
      resolution: string;
    };
  }[];

  onDiscoverPatterns: () => void;
  onSeeEvidence?: () => void;
};

export default function FirstEventChronologyView({
  firstEventDate,
  earlyChronology,
  onDiscoverPatterns,
  onSeeEvidence,
}: FirstEventChronologyViewProps) {
  const [chronologyOpen, setChronologyOpen] =
    useState(false);

  const chronologyRef =
    useRef<HTMLDivElement>(null);

  const toggleChronology = async () => {
    const panel = chronologyRef.current;

    if (chronologyOpen) {
      if (panel) {
        await panel.animate(
          [
            {
              opacity: 1,
              transform: "translateY(0)",
            },
            {
              opacity: 0,
              transform: "translateY(-8px)",
            },
          ],
          {
            duration: 420,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
          }
        ).finished;
      }

      setChronologyOpen(false);
      return;
    }

    setChronologyOpen(true);

    requestAnimationFrame(() => {
      const incoming = chronologyRef.current;

      if (!incoming) return;

      incoming.animate(
        [
          {
            opacity: 0,
            transform: "translateY(-8px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: 460,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        }
      );
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm leading-6 text-slate-600">
        {firstEventDate
          ? `The documented diary begins on ${firstEventDate}.`
          : "The first documented event date is not available."}
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <button
          type="button"
          onClick={toggleChronology}
          aria-expanded={chronologyOpen}
          className="text-sm font-semibold text-teal-800"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          {chronologyOpen
            ? "Close early chronology ↑"
            : "Open early chronology →"}
        </button>

        {chronologyOpen && (
          <div
            ref={chronologyRef}
            className="overflow-hidden"
          >
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {earlyChronology.map((event) => (
                <div
                  key={event.id}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                    {event.occurredAt.slice(0, 10)}
                  </p>

                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {event.description}
                  </p>

                  {event.sourceDiscrepancy && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                        Preserved source discrepancy
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {
                          event.sourceDiscrepancy
                            .clinicalRecordSummary
                        }
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {
                          event.sourceDiscrepancy
                            .resolution
                        }
                      </p>
                    </div>
                  )}

                  <p className="mt-auto pt-4 text-xs font-medium text-slate-500">
                    Evidence:{" "}
                    {event.evidence.join(" · ")}
                  </p>
                </div>
              ))}
            </div>

            {onSeeEvidence && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={onSeeEvidence}
                  className="rounded-full border border-teal-800/20 bg-white px-5 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    cursor:
                      'url("/paw-cursor-pink.png") 16 16, pointer',
                  }}
                >
                  Explore evidence beneath the first
                  events →
                </button>
              </div>
            )}

            <div className="flex justify-center pt-5">
              <button
                type="button"
                onClick={onDiscoverPatterns}
                className="rounded-full border border-teal-800/20 bg-white px-7 py-3 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
              >
                Discover Patterns →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}