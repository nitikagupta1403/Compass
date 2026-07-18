export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-6 shadow">
        <h1 className="text-4xl font-bold">Compass</h1>
        <p className="text-slate-300">
          Evidence-first Clinical Knowledge System
        </p>
      </header>

      <section className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-semibold">
            Welcome
          </h2>

          <p className="mt-4 text-gray-600">
            Compass transforms medical records into structured,
            explainable clinical timelines.
          </p>

          <button className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-lg">
            Open Patient
          </button>
        </div>
      </section>
    </main>
  );
}