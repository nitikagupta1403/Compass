import patients from "@/data/patients";
import { loadHopeSeizures } from "@/data/loadSeizures";
import type { SeizureEvent } from "@/types/seizure";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SeizureDiaryPage({
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

  const seizures = loadHopeSeizures();

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <article className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow-lg">
        <header className="border-b border-slate-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Compass Seizure Diary
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
            Longitudinal event record
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Owner-recorded seizure and symptomatic-event diary. Entries are
            preserved as recorded and are not automatically classified as
            confirmed epileptic seizures.
          </p>
        </section>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Time</th>
                <th className="px-3 py-3">Duration</th>
                <th className="px-3 py-3">Context</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Notes / Semiology</th>
                <th className="px-3 py-3">Rescue</th>
              </tr>
            </thead>

            <tbody>
              {seizures.map((event: SeizureEvent) => (
                <tr
                  key={event.id}
                  className="seizure-diary-row border-b border-slate-200 align-top"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {event.id}
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap text-slate-700">
                    {event.date}
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap text-slate-700">
                    {event.time ?? "—"}
                  </td>

                  <td className="px-3 py-3 whitespace-nowrap text-slate-700">
                    {event.duration ?? "—"}
                  </td>

                  <td className="px-3 py-3 text-slate-700">
                    {event.context ?? "—"}
                  </td>

                  <td className="px-3 py-3 text-slate-700">
                    {event.eventType ?? "seizure-event"}
                  </td>

                  <td className="px-3 py-3 text-slate-700">
                    <div className="space-y-1">
                      {event.notes && (
                        <p>{event.notes}</p>
                      )}

                      {event.motorSigns &&
                        event.motorSigns.length > 0 && (
                          <p>
                            <strong>Motor:</strong>{" "}
                            {event.motorSigns.join(", ")}
                          </p>
                        )}

                      {event.autonomicSigns &&
                        event.autonomicSigns.length > 0 && (
                          <p>
                            <strong>Autonomic:</strong>{" "}
                            {event.autonomicSigns.join(", ")}
                          </p>
                        )}

                      {event.postIctalSigns &&
                        event.postIctalSigns.length > 0 && (
                          <p>
                            <strong>Post-event:</strong>{" "}
                            {event.postIctalSigns.join(", ")}
                          </p>
                        )}

                      {event.dataQualityNote && (
                        <p className="text-amber-800">
                          <strong>Data-quality note:</strong>{" "}
                          {event.dataQualityNote}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-slate-700">
                    {event.rescueMedication ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-8 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
          Source: owner-maintained seizure diary. Compass preserves owner
          observations, symptomatic entries, chronology uncertainty, and rescue
          medication notes without independently reclassifying every episode.
        </footer>
      </article>
    </main>
  );
}
