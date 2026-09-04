type VideoEvidenceViewProps = {
  patientId: string;
  records: {
    id: string;
    date: string;
    time: string;
    durationSeconds: number;
    eventLinkStatus: string;
    clinicalContext?: string;
    observedEvidence?: string;
    seizureOnsetCaptured: boolean;
    seizureClassificationAssigned: boolean;
    sourceFile: string;
  }[];
};

export default function VideoEvidenceView({
  patientId,
  records,
}: VideoEvidenceViewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                  {record.date}
                </p>

                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {record.id}
                </h3>
              </div>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {record.eventLinkStatus}
              </span>
            </div>

            {record.clinicalContext && (
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {record.clinicalContext
                  .replaceAll("-", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            )}

            {record.observedEvidence && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Observed evidence
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {record.observedEvidence}
                </p>
              </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-slate-500">
                  Seizure onset captured
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {record.seizureOnsetCaptured ? "Yes" : "No"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium text-slate-500">
                  Classification assigned
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {record.seizureClassificationAssigned ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
              Time: {record.time} · Duration: {record.durationSeconds} seconds
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4">
  <a
    href={`/patients/${patientId}/evidence?source=${encodeURIComponent(
      record.sourceFile
    )}`}
      className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
  >
    View evidence record →
  </a>

    <a
      href={`/patients/${patientId}/evidence/source?source=${encodeURIComponent(
        record.sourceFile
      )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-800 hover:underline"
        style={{
          cursor:
            'url("/paw-cursor-pink.png") 16 16, pointer',
        }}
    >
      Open source video →
    </a>
  </div>
          </div>
        ))}
      </div>
    </div>
  );
}