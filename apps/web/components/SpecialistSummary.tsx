import { SeizureEvent } from "@/types/seizure";
import { calculateSeizureMetrics } from "@/data/seizureMetrics";
import { Medication, Report } from "@/types/patient";
import { VideoRecord } from "@/data/loadVideos";

type SpecialistSummaryProps = {
  seizures: SeizureEvent[];
  medications: Medication[];
  reports: Report[];
  videos: VideoRecord[];
};

export default function SpecialistSummary({
  seizures,
  medications,
  reports,
  videos,
}: SpecialistSummaryProps) {
  const metrics = calculateSeizureMetrics(seizures);

  const medicationNames = medications.map(
    (medication) => medication.name
  );

  const phenobarbitalReport = reports.find((report) =>
    report.title.toLowerCase().includes("phenobarbital")
  );

  const unlinkedVideos = videos.filter(
  (video) => video.eventLinkStatus === "unlinked"
  ).length;

  return (
    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Specialist Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Concise evidence-backed overview for veterinary neurology review.
        </p>
      </div>

      <div className="space-y-5 text-sm leading-6 text-slate-700">
        <div>
          <h3 className="font-semibold text-slate-900">
            Clinical problem
          </h3>

          <p className="mt-1">
            Hope is a male Beagle with a recurrent seizure disorder.
            Idiopathic epilepsy has been documented as the working clinical
            diagnosis, but the available evidence remains under specialist
            review.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Seizure history
          </h3>

          <p className="mt-1">
            The owner-maintained diary contains{" "}
            <strong>{metrics.totalLoggedEvents}</strong> logged seizure or
            symptomatic events from{" "}
            <strong>{metrics.firstEventDate ?? "unknown"}</strong> through{" "}
            <strong>{metrics.lastEventDate ?? "unknown"}</strong>. The record
            demonstrates recurrent multi-event days, with a maximum of{" "}
            <strong>{metrics.maxEventsInOneDay}</strong> logged events on a
            single day.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Reported semiology
          </h3>

          <p className="mt-1">
            Descriptions include longer convulsive episodes and shorter events
            involving mouth sounds, head shaking, cycling movements, limb
            stiffening, and variable post-event recovery difficulty. Compass
            does not currently classify all logged events as the same seizure
            type.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Antiseizure treatment history
          </h3>

          <p className="mt-1">
            Available prescription records document{" "}
            {medicationNames.length > 0
              ? medicationNames.join(", ")
              : "antiseizure medication history not yet available"}
            . Current maintenance treatment remains unconfirmed.
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-semibold text-amber-900">
            Therapeutic drug monitoring
          </h3>

          <p className="mt-1 text-amber-900">
            {phenobarbitalReport
              ? phenobarbitalReport.summary
              : "Therapeutic drug monitoring result not yet available."}
          </p>
        </div>

        <div>
          <p className="mt-1">
            <strong>{videos.length}</strong> owner-recorded video clips are available as
            primary video evidence.{" "}
            <strong>{unlinkedVideos}</strong> currently remain unlinked to a specific
            seizure event. Preliminary review has not established seizure onset or
            definitive ictal classification.
          </p>

          <p className="mt-1">
            Two owner-recorded clips are available as primary video evidence.
            Preliminary visual review has not established seizure onset or
            definitive ictal classification.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Main unresolved questions
          </h3>

          <p className="mt-1">
            Specialist input is requested regarding seizure classification,
            adequacy of the current maintenance regimen, interpretation of
            therapeutic drug monitoring, rescue treatment for multi-event
            episodes, and priority diagnostic investigations.
          </p>
        </div>
      </div>
    </section>
  );
}