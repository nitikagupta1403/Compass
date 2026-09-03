type TreatmentViewProps = {
  daily: string;
  sos: string;
  emergency: string;
  onSeeHistory: () => void;
  onSeeEvidence: () => void;
};

export default function TreatmentView({
  daily,
  sos,
  emergency,
  onSeeHistory,
  onSeeEvidence,
}: TreatmentViewProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <TreatmentCard
        title="Daily"
        headline={daily}
        detail="Current documented daily regimen."
      />

      <TreatmentCard
        title="SOS"
        headline={sos}
        detail="Current documented SOS regimen."
      />

      <TreatmentCard
        title="Emergency"
        headline={emergency}
        detail="Source-faithful emergency administration wording."
      />

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onSeeHistory}
          className="rounded-full border border-teal-800/20 bg-white px-7 py-3 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          View treatment history →
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSeeEvidence}
          className="rounded-full border border-teal-800/20 bg-white px-7 py-3 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          See Evidence →
        </button>
      </div>
    </div>
  );
}

function TreatmentCard({
  title,
  headline,
  detail,
}: {
  title: string;
  headline: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-teal-900/10 bg-teal-950/[0.02] p-6">
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