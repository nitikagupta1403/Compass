type BileAcidEvidenceViewProps = {
  patientId: string;
  bileAcids: {
    latestDate: string | null;
    latestSummary: string;
    latestSourceFiles: string[];

    history: {
      date: string;
      summary: string;
      sourceFiles: string[];
    }[];
  } | null;
};

export default function BileAcidEvidenceView({
  patientId,
  bileAcids,
}: BileAcidEvidenceViewProps) {
  if (!bileAcids) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-slate-500">
          Bile acid record not available.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            {bileAcids.latestDate}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-700">
            {bileAcids.latestSummary}
          </p>

          <p className="mt-3 text-xs font-medium text-slate-500">
            Source files: {bileAcids.latestSourceFiles.join(" · ")}
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {bileAcids.latestSourceFiles.map((sourceFile) => (
              <a
                key={sourceFile}
                href={`/patients/${patientId}/evidence?source=${encodeURIComponent(
                  sourceFile
                )}`}
                className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline"
                style={{
                  cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
              >
                View source record →
              </a>
            ))}
          </div>
        </div>

        {bileAcids.history.map((record) => (
          <div
            key={`${record.date}-${record.summary}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
              {record.date}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              {record.summary}
            </p>

            <p className="mt-3 text-xs font-medium text-slate-500">
              Source files: {record.sourceFiles.join(" · ")}
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {record.sourceFiles.map((sourceFile) => (
                <a
                  key={sourceFile}
                  href={`/patients/${patientId}/evidence?source=${encodeURIComponent(
                    sourceFile
                  )}`}
                  className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline"
                  style={{
                    cursor:
                      'url("/paw-cursor-pink.png") 16 16, pointer',
                  }}
                >
                  View source record →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}