type VideoRecord = {
  id: string;
  capturedAt: string;
  fileName: string;
  eventLinkStatus: string;
  clinicalPhase: string;
  source: string;
  verification: string;
  observations?: string[];
  interpretation?: string;
};

type VideoEvidenceProps = {
  videos: VideoRecord[];
};

export default function VideoEvidence({
  videos,
}: VideoEvidenceProps) {
  return (
    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Video Evidence
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Owner-recorded video evidence awaiting formal event linkage and
          specialist review.
        </p>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-lg border border-slate-200 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {video.id}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {video.fileName}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  {video.eventLinkStatus}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  specialist review required
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p>
                <strong>Captured:</strong> {video.capturedAt}
              </p>

              <p>
                <strong>Clinical phase:</strong> {video.clinicalPhase}
              </p>

              <p>
                <strong>Source:</strong> {video.source}
              </p>

              <p>
                <strong>Verification:</strong> {video.verification}
              </p>
            </div>

            {video.observations &&
              video.observations.length > 0 && (
                <div className="mt-5">
                  <h4 className="font-medium text-slate-900">
                    Observations
                  </h4>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {video.observations.map(
                      (observation, index) => (
                        <li key={index}>
                          {observation}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {video.interpretation && (
              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-900">
                  <strong>
                    Preliminary interpretation:
                  </strong>{" "}
                  {video.interpretation}
                </p>

                <p className="mt-2 text-xs text-amber-800">
                  Specialist video review required before
                  assigning seizure type or phase.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-semibold text-blue-900">
          Evidence boundary
        </h3>

        <p className="mt-2 text-sm text-blue-900">
          These clips are primary video evidence, but
          Compass does not yet assign them to a specific
          seizure event or classify ictal/post-ictal phase
          without explicit specialist review.
        </p>
      </div>
    </section>
  );
}