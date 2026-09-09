import BookNavigation from "@/components/book/BookNavigation";
import StoryHeader from "@/components/story/StoryHeader";
import StoryChapter from "@/components/story/StoryChapter";
import StoryNavigation from "@/components/story/StoryNavigation";

import { hopeClinicalJourney } from "@/data/clinicalJourney";

export default function JourneyPage() {
  return (
    <>
      <BookNavigation current="journey" />

      <main className="mx-auto max-w-5xl">

        <StoryHeader />

        {hopeClinicalJourney.map((milestone) => (
          <StoryChapter
            key={milestone.id}
            section={milestone}
        />
        ))}

        <StoryNavigation
          next="/patients/HOPE-001/treatment"
        />

      </main>
    </>
  );
}