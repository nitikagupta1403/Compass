type PatternsViewProps = {
  uniqueEventDays: number;
  multiEventDays: number;
  totalLoggedEvents: number;
  maxEventsInOneDay: number;
  sleepAssociatedEvents: number;
  symptomaticOnlyEvents: number;
  onFollowTreatment: () => void;
  onSeeEvidence?: () => void;
};

export default function PatternsView({
  uniqueEventDays,
  multiEventDays,
  totalLoggedEvents,
  maxEventsInOneDay,
  sleepAssociatedEvents,
  symptomaticOnlyEvents,
  onFollowTreatment,
  onSeeEvidence,
}: PatternsViewProps) {
 return (
  <div className="mx-auto max-w-3xl">
    <div className="grid gap-4 md:grid-cols-2">
      <PatternCard
        title="Event days"
        headline={`${uniqueEventDays}`}
        detail="Unique diary dates containing one or more logged entries."
      />

      <PatternCard
        title="Multi-event days"
        headline={`${multiEventDays}`}
        detail={`${totalLoggedEvents} total logged entries are currently represented in the diary.`}
      />

      <PatternCard
        title="Maximum in one day"
        headline={`${maxEventsInOneDay}`}
        detail="Highest number of logged entries represented on a single diary date."
      />

      <PatternCard
        title="Sleep-associated"
        headline={`${sleepAssociatedEvents}`}
        detail="Logged entries with sleep-related context or notes."
      />

      <PatternCard
        title="Symptomatic / SOS-only"
        headline={`${symptomaticOnlyEvents}`}
        detail="Logged symptomatic or SOS-only entries represented separately from the broader event count."
      />
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={onFollowTreatment}
        className="rounded-full border border-teal-800/20 bg-white px-5 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        style={{
          cursor:
            'url("/paw-cursor-pink.png") 16 16, pointer',
        }}
  >
    Follow treatment →
    </button>

      {onSeeEvidence && (
        <button
          type="button"
          onClick={onSeeEvidence}
          className="rounded-full border border-teal-800/20 bg-white px-5 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          Explore evidence beneath the patterns →
        </button>
      )}
    </div>
  </div>
);

function PatternCard({
  title,
  headline,
  detail,
}: {
  title: string;
  headline: string;
  detail: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-teal-900/10 bg-teal-950/[0.02] p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
        {title}
      </p>

      <p className="mt-3 text-xl font-bold text-slate-900">
        {headline}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {detail}
      </p>
    </div>
  );
}
}