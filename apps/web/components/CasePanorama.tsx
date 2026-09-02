"use client";

import { useState } from "react";

import VideoEvidenceView from "./VideoEvidenceView";
import DrugMonitoringView from "./DrugMonitoringView";
import LaboratoryEvidenceView from "./LaboratoryEvidenceView";
import BileAcidEvidenceView from "./BileAcidEvidenceView";

type DepthLevel =
  | "hope"
  | "know-hope"
  | "know-more"
  | "first-event"
  | "patterns"
  | "treatment"
  | "evidence"
  | "laboratory"
  | "bile-acids"
  | "drug-monitoring"
  | "videos";

type CasePanoramaProps = {
  patientName: string;
  photoSrc: string;
  patient: {
    patientId: string;
    species: string;
    breed: string;
    sex: string;
    dateOfBirth: string;
    weightKg: number | null;
    workingDiagnosis: string | null;
  };
  story: {
    totalLoggedEvents: number;
    uniqueEventDays: number;
    multiEventDays: number;
    firstEventDate: string | null;
    lastEventDate: string | null;
  };
  earlyChronology: {
    id: string;
    occurredAt: string;
    type: string;
    title: string;
    description: string;
    evidence: string[];
    sourceDiscrepancy?: {
    clinicalRecordSummary: string;
    resolution: string;
  };
}[];
  treatment: {
    daily: string;
    sos: string;
    emergency: string;
  };
  evidence: {
    laboratoryGroups: number;
    videos: number;
    drugMonitoring: number;
  };

    drugMonitoringRecords: {
        title: string;
        date: string;
        summary: string;
        sourceFiles: string[];
        }[];

    laboratoryGroups: {
        id: string;
        title: string;
        latestDate: string | null;
        latestSummary: string;
        latestCompactSummary: string;
        latestSourceFiles: string[];

        history: {
            date: string;
            summary: string;
            sourceFiles: string[];
        }[];

  }[];

    videoEvidence: {
        totalVideos: number;
        unlinkedVideos: number;
        specialistReviewRequired: boolean;
        records: {
            id: string;
            date: string;
            time: string;
            durationSeconds: number;
            eventLinkStatus: string;
            clinicalContext?: string;
            observedEvidence?: string;
            seizureOnsetCaptured: boolean;
            seizureClassificationAssigned: boolean;
            sourceFile: string;
        }[];
    };

  questions: string[];
};

export default function CasePanorama({
  patientName,
  photoSrc,
  patient,
  story,
  earlyChronology,
  treatment,
  evidence,
  laboratoryGroups,
  drugMonitoringRecords,
  videoEvidence,
  questions,
}: CasePanoramaProps) {
  const [level, setLevel] = useState<DepthLevel>("hope");

  if (level === "hope") {
    return (
      <div className="rounded-3xl border border-teal-900/15 bg-teal-950/[0.02] p-10">
        <div className="flex min-h-[430px] items-center justify-center">
          <button
            type="button"
            onClick={() => setLevel("know-hope")}
            className="group flex flex-col items-center"
            style={{ cursor: 'url("/paw-cursor-pink.png") 16 16, pointer' }}
          >
            <div className="rounded-full border border-teal-800/20 bg-white p-2 shadow-sm transition duration-300 group-hover:scale-105">
              <img src={photoSrc} alt={patientName} className="h-36 w-36 rounded-full object-cover" />
            </div>
            <p className="mt-5 text-4xl font-bold text-slate-900">{patientName}</p>
            <p className="mt-2 text-sm font-medium text-teal-700">Know Hope 🐾</p>
          </button>
        </div>
      </div>
    );
  }

  if (level === "know-hope") {
    return (
      <div className="rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm">
        <ZoomOut onClick={() => setLevel("hope")} />

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full border border-teal-800/20 bg-teal-50/20 p-2">
              <img src={photoSrc} alt={patientName} className="h-28 w-28 rounded-full object-cover" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">Know Hope</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{patientName}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <IdentityNode label="Patient ID" value={patient.patientId} />
            <IdentityNode label="Species" value={patient.species} />
            <IdentityNode label="Breed" value={patient.breed} />
            <IdentityNode label="Sex" value={patient.sex} />
            <IdentityNode label="DOB" value={patient.dateOfBirth} />
            <IdentityNode label="Weight" value={patient.weightKg !== null ? `${patient.weightKg} kg` : "Not documented"} />
          </div>

          <div className="mt-4 rounded-2xl border border-teal-900/10 bg-teal-950/[0.02] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Working diagnosis</p>
            <p className="mt-2 text-sm leading-6 text-slate-800">{patient.workingDiagnosis ?? "Not documented"}</p>
          </div>

          <div className="mt-10 flex justify-center">
            <JourneyButton onClick={() => setLevel("know-more")} label="Know More →" />
          </div>
        </div>
      </div>
    );
  }

  if (level === "know-more") {
    return (
      <div className="rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm">
        <ZoomOut onClick={() => setLevel("know-hope")} />

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">Know More</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Hope Story</h2>
            <p className="mt-2 text-sm text-slate-500">The distant view</p>
          </div>

          <div className="mt-16 flex justify-center">
            <StoryLandmark
                title="First Event"
                subtitle="Where the story begins"
                onClick={() => {
                    setLevel("first-event");
                }}
                />
          </div>
        </div>
      </div>
    );
  }
if (level === "first-event") {
  return (
    <JourneyShell
      eyebrow="First Event"
      title="The story begins"
      subtitle="The first clinical landmark"
      onZoomOut={() => setLevel("know-more")}
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm leading-6 text-slate-600">
          {story.firstEventDate
            ? `The documented diary begins on ${story.firstEventDate}.`
            : "The first documented event date is not available."}
        </p>

        <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <summary
                className="list-none text-sm font-semibold text-teal-800"
                style={{
                cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
            >
                Open early chronology →
            </summary>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
            {earlyChronology.map((event) => (
                <div
                key={event.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
                >
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                    {event.occurredAt.slice(0, 10)}
                </p>

                <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {event.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    {event.description}
                </p>

                {event.sourceDiscrepancy && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                        Preserved source discrepancy
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-700">
                        {event.sourceDiscrepancy.clinicalRecordSummary}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                        {event.sourceDiscrepancy.resolution}
                    </p>
                    </div>
                )}

                <p className="mt-auto pt-4 text-xs font-medium text-slate-500">
                    Evidence: {event.evidence.join(" · ")}
                </p>
                </div>
            ))}
            </div>
        <div className="pt-5 flex justify-center">
        <JourneyButton
            onClick={() => setLevel("patterns")}
            label="Discover Patterns →"
        />
        </div>

        </details>

        </div>
        </JourneyShell>
        );
        }

  if (level === "patterns") {
    return (
      <JourneyShell
        eyebrow="Patterns"
        title="What repeats?"
        subtitle="The next landmark"
        onZoomOut={() => {
            setLevel("first-event");
            }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 md:grid-cols-3">
            <DepthNode title="Event days" headline={`${story.uniqueEventDays}`} detail="Unique diary dates containing one or more logged entries." />
            <DepthNode title="Multi-event days" headline={`${story.multiEventDays}`} detail={`${story.totalLoggedEvents} total logged entries are currently represented in the diary.`} />
          </div>

          <div className="mt-10 flex justify-center">
            <JourneyButton onClick={() => setLevel("treatment")} label="Follow Treatment →" />
          </div>
        </div>
      </JourneyShell>
    );
  }

  if (level === "treatment") {
    return (
      <JourneyShell
        eyebrow="Treatment"
        title="What changed?"
        subtitle="The treatment landmark"
        onZoomOut={() => setLevel("patterns")}
      >
        <div className="mx-auto max-w-3xl space-y-4">
          <DepthNode title="Daily" headline={treatment.daily} detail="Current documented daily regimen." />
          <DepthNode title="SOS" headline={treatment.sos} detail="Current documented SOS regimen." />
          <DepthNode title="Emergency" headline={treatment.emergency} detail="Source-faithful emergency administration wording." />

          <div className="mt-10 flex justify-center">
            <JourneyButton onClick={() => setLevel("evidence")} label="See Evidence →" />
          </div>
        </div>
      </JourneyShell>
    );
  }

    if (level === "laboratory") {
        return (
            <JourneyShell
            eyebrow="Laboratory"
            title="Laboratory evidence"
            subtitle="A closer evidence view"
            onZoomOut={() => setLevel("evidence")}
            >
            <LaboratoryEvidenceView
                groups={laboratoryGroups}
                onOpenBileAcids={() => setLevel("bile-acids")}
            />
            </JourneyShell>
        );
        }

if (level === "evidence") {
  return (
    <JourneyShell
      eyebrow="Evidence"
      title="What supports the story?"
      subtitle="The evidence landmark"
      onZoomOut={() => setLevel("treatment")}
    >
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 md:grid-cols-3">

          <button
            type="button"
            onClick={() => setLevel("laboratory")}
            className="h-full w-full text-left"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            <DepthNode
              title="Laboratory"
              headline={`${evidence.laboratoryGroups}`}
              detail="Laboratory groups"
            />
          </button>

            <button
            type="button"
            onClick={() => setLevel("drug-monitoring")}
            className="h-full w-full text-left"
            style={{
                cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
            >
            <DepthNode
                title="Drug monitoring"
                headline={`${evidence.drugMonitoring}`}
                detail="Therapeutic drug-monitoring record(s)"
            />
            </button>

<button
  type="button"
  onClick={() => setLevel("videos")}
  className="h-full w-full text-left"
  style={{
    cursor:
      'url("/paw-cursor-pink.png") 16 16, pointer',
  }}
>
  <DepthNode
    title="Videos"
    headline={`${evidence.videos}`}
    detail="Video evidence record(s)"
  />
</button>

        </div>

        {questions.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
              Specialist questions
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {questions.map((question) => (
                <li key={question}>
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-xs font-medium text-slate-500">
            Next depth: exact evidence record → original source
          </p>
        </div>
      </div>
    </JourneyShell>
  );
}

    if (level === "videos") {
        return (
            <JourneyShell
            eyebrow="Videos"
            title="Video evidence"
            subtitle="A closer evidence view"
            onZoomOut={() => setLevel("evidence")}
            >
            <VideoEvidenceView
                patientId={patient.patientId}
                records={videoEvidence.records}
            />
            </JourneyShell>
        );
        }

        if (level === "bile-acids") {
        const bileAcids =
            laboratoryGroups.find(
            (group) =>
                group.title.toLowerCase() === "bile acids"
            ) ?? null;

        return (
            <JourneyShell
            eyebrow="Bile Acids"
            title="Bile acid evidence"
            subtitle="Exact laboratory record"
            onZoomOut={() => setLevel("laboratory")}
            >
            <BileAcidEvidenceView
                patientId={patient.patientId}
                bileAcids={bileAcids}
            />
            </JourneyShell>
        );
        }

    if (level === "drug-monitoring") {
        return (
            <JourneyShell
            eyebrow="Drug Monitoring"
            title="Therapeutic drug monitoring"
            subtitle="A closer evidence view"
            onZoomOut={() => setLevel("evidence")}
            >
            <DrugMonitoringView
                patientId={patient.patientId}
                records={drugMonitoringRecords}
            />
            </JourneyShell>
        );
        }

function ZoomOut({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-semibold text-teal-800"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      ← Zoom out
    </button>
  );
}

function JourneyButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-teal-800/20 bg-white px-7 py-3 text-sm font-semibold text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      {label}
    </button>
  );
}

function JourneyShell({
  eyebrow,
  title,
  subtitle,
  onZoomOut,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  onZoomOut: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm">
      <ZoomOut onClick={onZoomOut} />

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
}

function IdentityNode({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function StoryLandmark({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-w-0 flex-col items-center text-center"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      <div className="relative z-10 h-14 w-14 rounded-full border-2 border-teal-800/30 bg-white shadow-sm transition group-hover:scale-110 group-hover:border-teal-700">
        <div className="absolute inset-3 rounded-full bg-orange-200" />
      </div>

      <p className="mt-4 font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 max-w-[150px] text-xs leading-5 text-slate-500">
        {subtitle}
      </p>
    </button>
  );
}

function DepthNode({
  title,
  headline,
  detail,
}: {
  title: string;
  headline: string;
  detail: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-teal-900/10 bg-teal-950/[0.02] p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">{title}</p>
      <p className="mt-3 text-xl font-bold text-slate-900">{headline}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  text,
}: {
  date: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <p className="text-xs font-semibold text-slate-500">{date}</p>

      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}
}
