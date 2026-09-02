type DrugMonitoringViewProps = {
  patientId: string;
  records: {
    title: string;
    date: string;
    summary: string;
    sourceFiles: string[];
  }[];
};

export default function DrugMonitoringView({
  patientId,
  records,
}: DrugMonitoringViewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={`${record.date}-${record.title}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
              {record.date}
            </p>

            <h3 className="mt-2 text-base font-semibold text-slate-900">
              {record.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              {record.summary}
            </p>

            {record.sourceFiles.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-xs font-medium text-slate-500">
                  Source files: {record.sourceFiles.join(" · ")}
                </p>

                <div className="mt-3 flex flex-wrap gap-4">
                  {record.sourceFiles.map((sourceFile) => (
                    <a
                      key={sourceFile}
                      href={`/patients/${patientId}/evidence?source=${encodeURIComponent(
                        sourceFile
                      )}`}
                      className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
                      style={{
                        cursor:
                          'url("/paw-cursor-pink.png") 16 16, pointer',
                      }}
                    >
                      View {sourceFile} →
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}