import patients from "@/data/patients";

type Props = {
  params: Promise<{
    id: string;
    reportId: string;
  }>;
};

export default async function ReportPage({ params }: Props) {
  const { id, reportId } = await params;

  const patient = patients.find(
    (p) => p.id === Number(id)
  );

  if (!patient) {
    return (
      <h1 className="p-10 text-3xl text-red-600">
        Patient not found
      </h1>
    );
  }

  const report = patient.reports[Number(reportId)];

  if (!report) {
    return (
      <h1 className="p-10 text-3xl text-red-600">
        Report not found
      </h1>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-slate-900">
          {report.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {report.date}
        </p>

        <p className="mt-8 text-lg text-slate-700">
          {report.summary}
        </p>
      </div>
    </main>
  );
}
