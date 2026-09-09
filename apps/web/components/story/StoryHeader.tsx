export default function StoryHeader() {
  return (
    <header className="pb-20">

      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
        Clinical Journey
      </p>

      <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
        {"Hope's"} Clinical Journey
      </h1>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
        A chronological reconstruction of {"Hope's"} documented neurological
        history from clinical records, owner observations, prescriptions and
        laboratory investigations. Each milestone links directly to the
        supporting evidence used to construct this journey.
      </p>

    </header>
  );
}