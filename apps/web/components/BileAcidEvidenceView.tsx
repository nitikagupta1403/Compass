 type BileAcidEvidenceViewProps = {
  patientId: string;
  shareToken?: string;

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
  shareToken,
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

  const buildSourceHref = (
    sourceFile: string
  ) =>
    `/patients/${patientId}/evidence/source?source=${encodeURIComponent(
      sourceFile
    )}` +
    (shareToken
      ? `&share=${encodeURIComponent(
          shareToken
        )}`
      : "");

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

          {bileAcids.latestSourceFiles.length >
            0 && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Source record
              </p>

              <p className="mt-2 text-xs font-medium text-slate-500">
                {bileAcids.latestSourceFiles.join(
                  " · "
                )}
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                {bileAcids.latestSourceFiles.map(
                  (sourceFile) => (
                    <a
                      key={sourceFile}
                      href={buildSourceHref(
                        sourceFile
                      )}
                      className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline"
                      style={{
                        cursor:
                          'url("/paw-cursor-pink.png") 16 16, pointer',
                      }}
                    >
                      View source provenance →
                    </a>
                  )
                )}
              </div>
            </div>
          )}
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

            {record.sourceFiles.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Source record
                </p>

                <p className="mt-2 text-xs font-medium text-slate-500">
                  {record.sourceFiles.join(
                    " · "
                  )}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {record.sourceFiles.map(
                    (sourceFile) => (
                      <a
                        key={sourceFile}
                        href={buildSourceHref(
                          sourceFile
                        )}
                        className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline"
                        style={{
                          cursor:
                            'url("/paw-cursor-pink.png") 16 16, pointer',
                        }}
                      >
                        View source provenance →
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}