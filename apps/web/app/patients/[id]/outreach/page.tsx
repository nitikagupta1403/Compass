import patients from "@/data/patients";

import {
  hopeOutreachManifest,
  type OutreachPackageItem,
} from "@/data/outreachManifest";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OutreachPage({
  params,
}: Props) {
  const { id } = await params;

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

  const includedItems = hopeOutreachManifest.filter(
    (item) => item.include
  );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <article className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Compass Specialist Outreach Package
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {patient.demographics.name}
          </h1>

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
            Package manifest
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Files proposed for first-pass veterinary neurology review,
            ordered to move from concise clinical summary to primary
            supporting evidence.
          </p>
        </section>

        <div className="mt-6 space-y-4">
          {includedItems.map(
            (item: OutreachPackageItem) => (
              <ManifestCard
                key={`${item.order}-${item.fileName}`}
                item={item}
              />
            )
          )}
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
          Package contents are selected for neurological relevance.
          Omitted records are not treated as clinically irrelevant;
          they are simply excluded from the initial specialist packet
          unless specifically requested.
        </footer>
      </article>
    </main>
  );
}

function ManifestCard({
  item,
}: {
  item: OutreachPackageItem;
}) {
  return (
    <section className="print-compact-card rounded-lg border border-slate-200 p-5">
      <div className="flex gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {item.order}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-all font-semibold text-slate-900">
              {item.fileName}
            </h3>

            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {item.category}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            {item.purpose}
          </p>

          {item.notes && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Note
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-900">
                {item.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}