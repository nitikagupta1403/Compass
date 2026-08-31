import { SeizureEvent } from "@/types/seizure";
import { Medication, Report } from "@/types/patient";
import { calculateSeizureMetrics } from "@/data/seizureMetrics";

type ClinicalSnapshotProps = {
  seizures: SeizureEvent[];
  medications: Medication[];
  reports: Report[];
};

export default function ClinicalSnapshot({
  seizures,
  medications,
  reports,
}: ClinicalSnapshotProps) {
  const metrics = calculateSeizureMetrics(seizures);

  const currentMedicationCandidates = medications.filter(
    (medication) => medication.status === "current-unconfirmed"
  );

  const phenobarbitalReport = reports.find((report) =>
    report.title.toLowerCase().includes("phenobarbital")
  );

  return (
    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Clinical Snapshot
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current evidence-backed clinical overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Primary problem
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            Recurrent seizure disorder
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Diagnostic status
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            Idiopathic epilepsy / idiopathic seizures documented as working diagnosis
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Diary coverage
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {metrics.firstEventDate ?? "Unknown"} →{" "}
            {metrics.lastEventDate ?? "Unknown"}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {metrics.totalLoggedEvents} logged seizure or symptomatic events
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Maximum daily burden
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {metrics.maxEventsInOneDay} logged events in one day
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Therapeutic drug monitoring
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {phenobarbitalReport
              ? phenobarbitalReport.summary
              : "No phenobarbital monitoring result currently available."}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Current treatment status
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {currentMedicationCandidates.length > 0
              ? `${currentMedicationCandidates.length} medication record(s) marked current-unconfirmed.`
              : "Current antiseizure medication regimen requires confirmation."}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">
          Current uncertainties
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-900">
          <li>
            Current antiseizure maintenance regimen requires confirmation.
          </li>

          <li>
            Seizure phenotype and classification require specialist review;
            diary frequency and multi-event patterns are now structured in Compass.
          </li>

          <li>
            Date of birth is inconsistent across available clinical records and
            requires verification.
          </li>

          <li>
            Further diagnostic work-up and specialist interpretation have not
            yet been fully incorporated.
          </li>
        </ul>
      </div>
    </section>
  );
}