import Link from "next/link";
import { Patient } from "@/types/patient";

type PatientCardProps = {
  patient: Patient;
};

export default function PatientCard({
  patient,
}: PatientCardProps) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-slate-900">
        {patient.demographics.name}
      </h2>

      <div className="mt-4 space-y-2">
        <p className="text-slate-700">
          <strong>Species:</strong> {patient.demographics.species}
        </p>

        <p className="text-slate-700">
          <strong>Breed:</strong> {patient.demographics.breed}
        </p>

        <p className="text-slate-700">
          <strong>Sex:</strong> {patient.demographics.sex}
        </p>

        <p className="text-slate-700">
          <strong>Condition:</strong> {patient.condition}
        </p>
      </div>

      <Link
        href={`/patients/${patient.id}`}
        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2 text-white transition-colors hover:bg-slate-700"
      >
        View Record
      </Link>
    </div>
  );
}