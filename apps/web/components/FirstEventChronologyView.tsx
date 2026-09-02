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
};

export default function FirstEventChronologyView({
  firstEventDate,
  earlyChronology,
  onDiscoverPatterns,
}: FirstEventChronologyViewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm leading-6 text-slate-600">
        {firstEventDate
          ? `The documented diary begins on ${firstEventDate}.`
          : "The first documented event date is not available."}
      </p>

      <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <summary
          className="list-none text-sm font-semibold text-teal-800"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          Open early chronology →
        </summary>

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
                    {event.sourceDiscrepancy.clinicalRecordSummary}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {event.sourceDiscrepancy.resolution}
                  </p>
                </div>
              )}

              <p className="mt-auto pt-4 text-xs font-medium text-slate-500">
                Evidence: {event.evidence.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-5 flex justify-center">
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
      </details>
    </div>
  );
}