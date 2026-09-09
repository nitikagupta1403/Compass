import StoryHeader from "@/components/story/StoryHeader";
import StoryChapter from "@/components/story/StoryChapter";
import StoryNavigation from "@/components/story/StoryNavigation";

import { hopeStory } from "@/data/story";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">

      <article className="mx-auto max-w-5xl rounded-2xl bg-white p-12 shadow-lg">

        <StoryHeader />

        <div className="mt-12">

          {hopeStory.map((section) => (
            <StoryChapter
              key={section.id}
              section={section}
            />
          ))}

        </div>

        <StoryNavigation
          next="/patients/HOPE-001/pattern"
        />

      </article>

    </main>
  );
}