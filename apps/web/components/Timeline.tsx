import { ClinicalEvent } from "@/types/patient";

type TimelineProps = {
  clinicalEvents: ClinicalEvent[];
};

function certaintyLabel(certainty?: ClinicalEvent["certainty"]) {
  switch (certainty) {
    case "verified":
      return "Verified";
    case "owner-reported":
      return "Owner reported";
    case "derived":
      return "Derived";
    case "unverified":
      return "Unverified";
    default:
      return null;
  }
}

export default function Timeline({
  clinicalEvents,
}: TimelineProps) {
  return (
    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Clinical Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Events are shown with provenance and certainty status.
        </p>
      </div>

      <div className="space-y-6">
        {clinicalEvents.map((event) => {
          const certainty = certaintyLabel(event.certainty);

          return (
            <div
              key={event.id}
              className="rounded-lg border border-slate-200 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {event.type}
                  </span>

                  {certainty && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {certainty}
                    </span>
                  )}
                </div>

                <span className="text-sm text-slate-500">
                  {event.date}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {event.title}
              </h3>

              <p className="mt-2 text-slate-700">
                {event.summary}
              </p>

              <div className="mt-4 space-y-1 text-sm text-slate-500">
                {event.clinician && (
                  <p>
                    <strong>Clinician:</strong> {event.clinician}
                  </p>
                )}

                {event.source && (
                  <p>
                    <strong>Source:</strong> {event.source}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}