import { Medication } from "@/types/patient";

type MedicationListProps = {
  medications: Medication[];
};

export default function MedicationList({
  medications,
}: MedicationListProps) {
  return (
    <div className="mt-10 rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Medication History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Prescription history extracted from source clinical records.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {medications.map((medication, index) => (
          <div
            key={`${medication.name}-${medication.prescribedOn ?? index}`}
            className="rounded-lg border border-slate-200 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {medication.name}
                </h3>

                {medication.activeIngredient && (
                  <p className="text-sm text-slate-500">
                    {medication.activeIngredient}
                  </p>
                )}
              </div>

              {medication.evidenceStatus && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {medication.evidenceStatus}
                </span>
              )}
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p>
                <strong>Dose:</strong> {medication.dose}
              </p>

              <p>
                <strong>Frequency:</strong> {medication.frequency}
              </p>

              {medication.prescribedOn && (
                <p>
                  <strong>Prescribed:</strong> {medication.prescribedOn}
                </p>
              )}

              {medication.duration && (
                <p>
                  <strong>Duration:</strong> {medication.duration}
                </p>
              )}

              {medication.status && (
                <p>
                  <strong>Status:</strong>{" "}
                  {medication.status === "current-unconfirmed"
                    ? "Current status requires confirmation"
                    : medication.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">
          Therapeutic drug monitoring
        </h3>

        <p className="mt-2 text-sm text-amber-900">
          2 Jun 2026 — serum phenobarbital: <strong>8.8</strong>.
          Laboratory reference interval: <strong>18–45</strong>.
          The source laboratory labelled the result subtherapeutic.
        </p>

        <p className="mt-2 text-xs text-amber-800">
          This is a source-recorded laboratory finding, not an independent
          dosing recommendation by Compass.
        </p>
      </div>
    </div>
  );
}