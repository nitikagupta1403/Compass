type LaboratoryEvidenceViewProps = {
  groups: {
    id: string;
    title: string;
    latestDate: string | null;
    latestCompactSummary: string;
  }[];
  onOpenBileAcids: () => void;
};

export default function LaboratoryEvidenceView({
  groups,
  onOpenBileAcids,
}: LaboratoryEvidenceViewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {groups.map((group) => {
          const isBileAcids =
            group.title.toLowerCase() === "bile acids";

          const content = (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                  {group.title}
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {group.latestDate ?? "Date not documented"}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {group.latestCompactSummary}
                </p>

                {isBileAcids && (
                  <p className="mt-4 text-xs font-semibold text-teal-800">
                    Open exact record →
                  </p>
                )}
              </div>
            );
          if (isBileAcids) {
            return (
              <button
                key={group.id}
                type="button"
                onClick={onOpenBileAcids}
                className="block w-full text-left"
                style={{
                  cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
              >
                {content}
              </button>
            );
          }

          return (
            <div key={group.id}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}