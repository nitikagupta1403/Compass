import type { ClinicalJourneyMilestone } from "@/data/clinicalJourney";
import Link from "next/link";

type Props = {
  section: ClinicalJourneyMilestone;
};

export default function StoryChapter({
  section,
}: Props) {
  return (
    <section className="py-20">

  <p className="text-sm uppercase tracking-[0.30em] text-slate-500">
    {section.period}
  </p>

  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
    {section.title}
  </h2>

  <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-700">
    {section.summary}
  </p>

  <Link
    href="/patients/HOPE-001/evidence"
    className="mt-10 inline-flex text-sm font-medium text-teal-800 hover:text-teal-600"
  >
    View supporting evidence ({section.evidence.length} records) →
  </Link>

  <div className="mt-20 border-t border-slate-200" />

</section>
  );
}