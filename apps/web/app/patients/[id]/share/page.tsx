import ShareLinkPrototype from "@/components/ShareLinkPrototype";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SharePatientPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
          Compass Clinical
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Share Hope with a veterinarian
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          This case will be shared as a read-only specialist
          view.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Patient ID
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {id}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
          <p className="font-semibold text-orange-900">
            External sharing is not enabled yet.
          </p>

          <p className="mt-2 text-sm leading-6 text-orange-800">
            We are designing the access controls before
            generating real external links.
          </p>
        </div>

        <div className="mt-7">
          <ShareLinkPrototype patientId={id} />

          <a
            href={`/patients/${id}/referral`}
            className="mt-5 inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            ← Back to Hope
          </a>
        </div>
      </section>
    </main>
  );
}