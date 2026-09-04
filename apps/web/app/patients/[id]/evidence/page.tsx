import patients from "@/data/patients";
import BackButton from "@/components/BackButton";
import {
  hopeEvidenceIndex,
  type EvidenceIndexItem,
} from "@/data/evidenceIndex";

type Props = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    source?: string;
    treatment?: string;
  }>;
};

export default async function EvidencePage({
  params,
  searchParams,
  }: Props) {
    const { id } = await params;

  const {
    source,
    treatment,
  } = await searchParams;

  const selectedTreatment =
    treatment ?? null;

  const patient = patients.find(
    (patient) => patient.id === id
  );

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Patient not found
        </h1>
      </main>
    );
  }

  const treatmentRecord =
  selectedTreatment
    ? patient.medications.find(
        (medication) =>
          medication.name.toLowerCase() ===
          selectedTreatment.toLowerCase()
      )
    : null;

const treatmentTerms = [
  selectedTreatment,
  treatmentRecord?.activeIngredient,
]
  .filter((value): value is string => Boolean(value))
  .map((value) => value.toLowerCase());

const visibleEvidence = hopeEvidenceIndex.filter(
  (item) => {
    const matchesSource =
      !source ||
      item.sourceFile === source ||
      item.sourceFiles?.includes(source);

    const searchableEvidence = [
      item.sourceFile,
      ...(item.sourceFiles ?? []),
      ...item.supports,
      item.notes ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesTreatment =
      treatmentTerms.length === 0 ||
      treatmentTerms.some((term) =>
        searchableEvidence.includes(term)
      );

    return matchesSource && matchesTreatment;
  }
);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <article className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">
          <BackButton />
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Compass Evidence Index
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {patient.demographics.name}
          </h1>

          {selectedTreatment && (
            <div className="mb-5 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Focused treatment:{" "}
            <span className="font-semibold">
              {selectedTreatment}
            </span>

            {treatmentRecord?.activeIngredient && (
              <span className="ml-2 text-teal-700">
                · matching {selectedTreatment} +{" "}
                {treatmentRecord.activeIngredient} evidence
              </span>
            )}
            </div>
          )}

          <p className="mt-2 text-slate-600">
            {patient.demographics.species} ·{" "}
            {patient.demographics.breed} ·{" "}
            {patient.demographics.sex}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Patient ID: {patient.id}
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Evidence register
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Source-level index of clinical records, owner diary evidence,
            laboratory findings, and video evidence used by Compass.
          </p>
        </section>

        <div className="mt-6 space-y-4">
          {visibleEvidence.map(
            (item: EvidenceIndexItem) => (
              <EvidenceCard
                key={item.id}
                item={item}
                patientId={patient.id}
              />
            )
          )}
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
          Evidence items are indexed by source. Clinical interpretation remains
          separate from source documentation. Discrepancies and uncertain
          attribution are preserved rather than silently reconciled.
        </footer>
      </article>
    </main>
  );
}

function EvidenceCard({
  item,
  patientId,
}: {
  item: EvidenceIndexItem;
  patientId: string;
}) {
  return (
    <section className="evidence-index-card print-compact-card rounded-lg border border-slate-200 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-900">
              {item.id}
            </h3>

            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {item.category}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-700">
            Source{" "}
              {item.sourceFiles?.length ? "files" : "file"}:{" "}
              {Array.from(
                new Set([
                item.sourceFile,
                ...(item.sourceFiles ?? []),
              ])
            ).join(" · ")}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Date: {item.date}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
            <EvidenceStatus status={item.status} />

           <a
            href={`?source=${encodeURIComponent(
              item.sourceFile
            )}`}
            className="text-xs font-semibold text-teal-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            View indexed record →
          </a>

          <a
            href={`/patients/${patientId}/evidence/source?source=${encodeURIComponent(
              item.sourceFile
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 underline-offset-4 hover:text-slate-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            Open source document →
          </a>

        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Supports
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {item.supports.map(
            (claim: string) => (
              <li key={claim}>
                {claim}
              </li>
            )
          )}
        </ul>
      </div>

      {item.notes && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            Data-quality note
          </p>

          <p className="mt-1 text-sm leading-6 text-amber-900">
            {item.notes}
          </p>
        </div>
      )}
    </section>
  );
}

function EvidenceStatus({
  status,
}: {
  status: EvidenceIndexItem["status"];
}) {
  const styles = {
    verified:
      "bg-emerald-50 text-emerald-700",
    "owner-reported":
      "bg-blue-50 text-blue-700",
    derived:
      "bg-violet-50 text-violet-700",
    "requires-review":
      "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}