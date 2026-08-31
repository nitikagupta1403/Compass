import { Diagnosis } from "../types/patient";

type DiagnosisListProps = {
  diagnoses: Diagnosis[];
};

export default function DiagnosisList({
  diagnoses,
}: DiagnosisListProps) {
  return (
    <section className="mt-10 rounded-xl bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-slate-900">
        Diagnoses
      </h2>

      <div className="mt-6 space-y-4">
        {diagnoses.map((diagnosis, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 p-5"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {diagnosis.name}
            </h3>

            <p className="mt-2 text-slate-700">
              <strong>Status:</strong> {diagnosis.status}
            </p>

            <p className="text-slate-700">
              <strong>Diagnosed:</strong> {diagnosis.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}