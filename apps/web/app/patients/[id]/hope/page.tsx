import BookNavigation from "@/components/book/BookNavigation";
import StoryNavigation from "@/components/story/StoryNavigation";

<main className="mx-auto max-w-5xl">

  <BookNavigation current="hope" />

  <article className="space-y-16">

    {/* -------------------------------------------------------
        HOPE
    ------------------------------------------------------- */}

    <header>

      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
        Patient
      </p>

      <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Hope
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        Hope is a male Beagle with a documented history of recurrent seizure
        episodes. This record has been organized to support an independent
        specialist neurological review.
      </p>

    </header>

    {/* -------------------------------------------------------
        PATIENT
    ------------------------------------------------------- */}

    <section className="grid gap-10 md:grid-cols-2">

      <div>

        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Species
        </p>

        <p className="mt-2 text-2xl text-slate-900">
          Dog
        </p>

      </div>

      <div>

        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Breed
        </p>

        <p className="mt-2 text-2xl text-slate-900">
          Beagle
        </p>

      </div>

      <div>

        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Sex
        </p>

        <p className="mt-2 text-2xl text-slate-900">
          Male
        </p>

      </div>

      <div>

        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Clinical Record
        </p>

        <p className="mt-2 text-2xl text-slate-900">
          May 2025 – Present
        </p>

      </div>

    </section>

    {/* -------------------------------------------------------
        CURRENT CLINICAL CONTEXT
    ------------------------------------------------------- */}

    <section>

      <h2 className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Current Clinical Context
      </h2>

      <div className="mt-8 space-y-8">

        <div>

          <p className="text-sm text-slate-500">
            Current Clinical Concern
          </p>

          <p className="mt-2 text-2xl font-medium text-slate-900">
            Recurrent seizure episodes
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Working Diagnosis
          </p>

          <p className="mt-2 text-xl text-slate-900">
            Idiopathic epilepsy
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Documented working diagnosis
          </p>

        </div>

      </div>

    </section>

    {/* -------------------------------------------------------
        CURRENT TREATMENT
    ------------------------------------------------------- */}

    <section>

      <h2 className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Current Treatment
      </h2>

      <ul className="mt-6 space-y-3 text-lg text-slate-800">

        <li>Phenobarbital</li>

        <li>Levetiracetam</li>

        <li>Emergency medications (as prescribed)</li>

      </ul>

      <p className="mt-5 text-sm text-slate-500">
        Complete treatment history is presented in the Treatment Journey chapter.
      </p>

    </section>

    {/* -------------------------------------------------------
        CARE
    ------------------------------------------------------- */}

    <section>

      <h2 className="text-xs uppercase tracking-[0.24em] text-slate-400">
        Care
      </h2>

      <div className="mt-6 space-y-6">

        <div>

          <p className="text-sm text-slate-500">
            Primary Caregiver
          </p>

          <p className="mt-2 text-xl text-slate-900">
            Nitika Gupta
          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Purpose of this Record
          </p>

          <p className="mt-2 max-w-3xl leading-7 text-slate-700">
            To support an independent specialist neurological review through an
            organized, evidence-based presentation of {"Hope's"} documented clinical
            history.
          </p>

        </div>

      </div>

    </section>

    {/* -------------------------------------------------------
        CONTINUE
    ------------------------------------------------------- */}

    <StoryNavigation
      next="/patients/HOPE-001/story"
    />

  </article>

</main>