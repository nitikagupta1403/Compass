import { Allergy } from "../types/patient";

type AllergyListProps = {
  allergies: Allergy[];
};

export default function AllergyList({
  allergies,
}: AllergyListProps) {
  return (
    <section className="mt-10 rounded-xl bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-slate-900">
        Allergies
      </h2>

      <div className="mt-6 space-y-4">
        {allergies.map((allergy, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 p-5"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {allergy.name}
            </h3>

            <p className="mt-2 text-slate-700">
              <strong>Severity:</strong> {allergy.severity}
            </p>

            <p className="text-slate-700">
              <strong>Reaction:</strong> {allergy.reaction}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}