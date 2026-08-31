export default function SpecialistQuestions() {
  const questions = [
    "Does the seizure semiology and longitudinal course support idiopathic epilepsy, or should structural/metabolic causes be reconsidered?",
    "How should the documented serum phenobarbital concentration of 8.8 (laboratory reference 18–45) be interpreted in context of the treatment history and sampling timing?",
    "What antiseizure maintenance regimen would you recommend based on the documented seizure burden and clustering pattern?",
    "What rescue protocol would you recommend for cluster seizures or prolonged events?",
    "Do the available videos provide useful evidence regarding ictal versus post-ictal phase or focal versus generalized onset?",
    "What further diagnostic investigations should be prioritized?",
    "Are there clinically important drug interactions, monitoring requirements, or adverse-effect risks that should be addressed?"
  ];

  return (
    <section className="mt-8 rounded-xl border border-slate-300 bg-white p-6 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Specialist Review Questions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Key questions for veterinary neurology consultation.
        </p>
      </div>

      <ol className="space-y-3">
        {questions.map((question, index) => (
          <li
            key={question}
            className="flex gap-4 rounded-lg border border-slate-200 p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {index + 1}
            </span>

            <p className="text-sm leading-6 text-slate-700">
              {question}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          These questions are intended to support specialist review and shared
          clinical decision-making. Compass does not independently prescribe or
          alter treatment.
        </p>
      </div>
    </section>
  );
}