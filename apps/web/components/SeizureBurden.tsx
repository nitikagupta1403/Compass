import { SeizureEvent } from "@/types/seizure";
import { calculateSeizureMetrics } from "@/data/seizureMetrics";

type SeizureBurdenProps = {
  events: SeizureEvent[];
};

export default function SeizureBurden({
  events,
}: SeizureBurdenProps) {
  const metrics = calculateSeizureMetrics(events);

  return (

    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Seizure Burden
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Owner-logged seizure and symptomatic-event summary.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Logged events
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {metrics.totalLoggedEvents}
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {metrics.multiEventDays.length} multi-event days
          </p>

    <p className="mt-1 text-xs text-slate-500">
      Maximum {metrics.maxEventsInOneDay} logged events in one day.
    </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Multi-event pattern
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {metrics.multiEventDays.length} multi-event days
          </p>

      <p className="mt-1 text-xs text-slate-500">
        Maximum {metrics.maxEventsInOneDay} logged events in one day.
      </p>
              </div>

                <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Sleep association
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {metrics.sleepAssociatedEvents} logged events
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Explicitly associated with sleep or half-sleep in the diary.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Sleep association
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            Repeatedly documented
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Several episodes were logged during sleep or half-sleep.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">
            Recurrent semiology in owner log
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {[...metrics.multiEventDays]
              .sort((a, b) => b.count - a.count || a.date.localeCompare(b.date))
              .map((day) => (
                <li key={day.date}>
                  <strong>{day.date}:</strong> {day.count} logged events
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          Diary coverage:{" "}
          <strong>{metrics.firstEventDate ?? "Unknown"}</strong>
          {" → "}
          <strong>{metrics.lastEventDate ?? "Unknown"}</strong>
          {" · "}
          {metrics.uniqueEventDays} unique event days
          {" · "}
          {metrics.symptomaticOnlyEvents} symptomatic/SOS-only entries
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-900">
            Cluster days requiring specialist attention
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            <li><strong>24 Oct 2025:</strong> 4 logged events</li>
            <li><strong>4 Nov 2025:</strong> 4 logged events</li>
            <li><strong>18 Nov 2025:</strong> 4 entries; chronology requires verification</li>
            <li><strong>31 Mar 2026:</strong> 5 logged events</li>
            <li><strong>4 May 2026:</strong> 4 logged events, followed by another early 5 May</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-semibold text-blue-900">
          Interpretation boundary
        </h3>

        <p className="mt-2 text-sm text-blue-900">
          Compass currently summarizes the owner diary without classifying every
          episode as a confirmed epileptic seizure. Short symptomatic events,
          SOS-treated prodromal events, and longer convulsive episodes remain
          distinguishable until specialist review.
        </p>
      </div>
    </section>
  );
}