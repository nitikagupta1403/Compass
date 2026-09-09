import BookNavigation from "@/components/book/BookNavigation";
import StoryNavigation from "@/components/story/StoryNavigation";

import TreatmentHeader from "@/components/treatment/TreatmentHeader";
import TreatmentMilestone from "@/components/treatment/TreatmentMilestone";

import { hopeTreatmentJourney } from "@/data/treatmentJourney";

export default function TreatmentPage() {
  return (
    <>
      <BookNavigation current="treatment" />

      <main className="mx-auto max-w-5xl">

        <TreatmentHeader />

        {hopeTreatmentJourney.map((milestone) => (
          <TreatmentMilestone
            key={milestone.id}
            milestone={milestone}
          />
        ))}

        <StoryNavigation
          next="/patients/HOPE-001/pattern"
        />

      </main>
    </>
  );
}