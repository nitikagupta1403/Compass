import type { TreatmentMilestone } from "@/data/treatmentJourney";

type Props = {
  milestone: TreatmentMilestone;
};

export default function TreatmentMilestone({
  milestone,
}: Props) {
  return (
    <section className="py-20">

      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
        {milestone.date}
      </p>

      <h2 className="mt-4 text-3xl font-semibold">
        {milestone.title}
      </h2>

      <p className="mt-8 text-lg leading-9 text-slate-700">
        {milestone.summary}
      </p>

    </section>
  );
}