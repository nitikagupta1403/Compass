type EvidenceLandingViewProps = {
  laboratoryGroups: number;
  drugMonitoring: number;
  videos: number;
  questions: string[];

  onOpenLaboratory: () => void;
  onOpenDrugMonitoring: () => void;
  onOpenVideos: () => void;
};

export default function EvidenceLandingView({
  laboratoryGroups,
  drugMonitoring,
  videos,
  questions,
  onOpenLaboratory,
  onOpenDrugMonitoring,
  onOpenVideos,
}: EvidenceLandingViewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={onOpenLaboratory}
          className="h-full w-full text-left"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          <EvidenceCard
            title="Laboratory"
            headline={`${laboratoryGroups}`}
            detail="Laboratory groups"
          />
        </button>

        <button
          type="button"
          onClick={onOpenDrugMonitoring}
          className="h-full w-full text-left"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          <EvidenceCard
            title="Drug monitoring"
            headline={`${drugMonitoring}`}
            detail="Therapeutic drug-monitoring record(s)"
          />
        </button>

        <button
          type="button"
          onClick={onOpenVideos}
          className="h-full w-full text-left"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          <EvidenceCard
            title="Videos"
            headline={`${videos}`}
            detail="Video evidence record(s)"
          />
        </button>
      </div>

      {questions.length > 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            Specialist questions
          </p>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-xs font-medium text-slate-500">
          Next depth: exact evidence record → original source
        </p>
      </div>
    </div>
  );
}

function EvidenceCard({
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