import patients from "@/data/patients";
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
  }>;
};

export default async function EvidenceSourcePage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { source } = await searchParams;

  const patient = patients.find(
    (patient) => patient.id === id
  );

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Source unavailable
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Patient not found
          </h1>
        </div>
      </main>
    );
  }

  /*
   * The evidence index used by this route currently belongs
   * specifically to Hope.
   *
   * Do not allow another patient route to resolve Hope's
   * indexed source records.
   */
  if (patient.id !== "HOPE-001") {
    return (
      <SourceUnavailable
        patientId={patient.id}
        message="No source index is available for this patient."
      />
    );
  }

  if (!source) {
    return (
      <SourceUnavailable
        patientId={patient.id}
        message="No source record was requested."
      />
    );
  }

  /*
   * IMPORTANT:
   *
   * We do not trust the source query parameter by itself.
   *
   * The requested filename must already exist in the
   * Compass evidence index.
   */
  const matchingEvidence =
    hopeEvidenceIndex.filter((item) =>
      evidenceContainsSource(item, source)
    );

  if (matchingEvidence.length === 0) {
    return (
      <SourceUnavailable
        patientId={patient.id}
        message="This source is not registered in the Compass evidence index."
        requestedSource={source}
      />
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            Compass source provenance
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Original source record
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            This view identifies the source record registered
            in Compass. Clinical interpretation remains
            separate from the original documentation.
          </p>
        </header>

        <section className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Patient
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900">
            {patient.demographics.name}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Patient ID: {patient.id}
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-teal-200 bg-teal-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            Source record
          </p>

          <p className="mt-3 break-all text-base font-semibold text-slate-900">
            {source}
          </p>

          <div className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Indexed source
          </div>
        </section>

        <section className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Compass references
          </p>

          <div className="mt-4 space-y-4">
            {matchingEvidence.map((item) => (
              <SourceEvidenceCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
            Provenance boundary
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-900">
            Compass has verified that this filename is
            referenced by its evidence index. This page does
            not reinterpret, modify, reconcile, or replace
            the underlying source document.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`/patients/${patient.id}/evidence?source=${encodeURIComponent(
              source
            )}`}
            className="rounded-full border border-teal-800/20 bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            View indexed evidence →
          </a>

          <a
            href={`/patients/${patient.id}/referral`}
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            Return to Hope Wonderland
          </a>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
          Source identity is preserved exactly as registered
          in the Compass evidence index. Unknown source names
          are not resolved.
        </footer>
      </article>
    </main>
  );
}

function evidenceContainsSource(
  item: EvidenceIndexItem,
  source: string
) {
  if (item.sourceFile === source) {
    return true;
  }

  return item.sourceFiles?.includes(source) ?? false;
}

function SourceEvidenceCard({
  item,
}: {
  item: EvidenceIndexItem;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            {item.id}
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {item.category}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Date: {item.date}
          </p>
        </div>

        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          {formatStatus(item.status)}
        </span>
      </div>

      {item.supports.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Indexed supports
          </p>

          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
            {item.supports.map((claim) => (
              <li key={claim}>
                {claim}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.notes && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            Data-quality note
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-900">
            {item.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function SourceUnavailable({
  patientId,
  message,
  requestedSource,
}: {
  patientId: string;
  message: string;
  requestedSource?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
          Source unavailable
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Source record could not be opened
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {message}
        </p>

        {requestedSource && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Requested source
            </p>

            <p className="mt-2 break-all text-sm text-slate-700">
              {requestedSource}
            </p>
          </div>
        )}

        <a
          href={`/patients/${patientId}/evidence`}
          className="mt-6 inline-block text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
        >
          Return to evidence index →
        </a>
      </div>
    </main>
  );
}

function formatStatus(
  status: EvidenceIndexItem["status"]
) {
  return status
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}