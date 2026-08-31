import Link from "next/link";

import { Report }  from "../types/patient";

type ReportListProps = {
  patientId: string;
  reports: Report[];
};

export default function ReportList({
  patientId,
  reports,
}: ReportListProps) {
  return (
    <section className="mt-10 rounded-xl bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-slate-900">
        Clinical Reports
      </h2>

      <div className="mt-6 space-y-4">
        {reports.map((report, index) => (
          <Link
            key={index}
            href={`/patients/${patientId}/reports/${index}`}
            className="block rounded-lg border border-slate-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <p className="text-sm text-slate-500">
              {report.date}
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              {report.title}
            </h3>

            <p className="mt-2 text-slate-700">
              {report.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}