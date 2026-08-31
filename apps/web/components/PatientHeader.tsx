import { Patient } from "@/types/patient";

type PatientHeaderProps = {
  patient: Patient;
};

export default function PatientHeader({
  patient,
}: PatientHeaderProps) {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-8 shadow-lg">
      <h1 className="text-4xl font-bold text-slate-900">
        {patient.demographics.name}
      </h1>

      <div className="mt-3 flex flex-wrap gap-3 text-slate-700">
        <span>{patient.demographics.species}</span>
        <span>•</span>

        <span>{patient.demographics.breed}</span>
        <span>•</span>

        <span>{patient.demographics.sex}</span>
      </div>

      <div className="mt-6 inline-flex rounded-lg bg-blue-100 px-4 py-2">
        <span className="font-semibold text-blue-900">
          {patient.condition}
        </span>
      </div>
    </section>
  );
}