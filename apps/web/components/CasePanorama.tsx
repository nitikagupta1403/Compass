"use client";

import { useState } from "react";

import VideoEvidenceView from "./VideoEvidenceView";
import DrugMonitoringView from "./DrugMonitoringView";
import LaboratoryEvidenceView from "./LaboratoryEvidenceView";
import BileAcidEvidenceView from "./BileAcidEvidenceView";
import FirstEventChronologyView from "./FirstEventChronologyView";
import PatternsView from "./PatternsView";
import TreatmentView from "./TreatmentView";
import EvidenceLandingView from "./EvidenceLandingView";
import TreatmentHistoryView from "./TreatmentHistoryView";

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
  | "videos"
  | "treatment-history";

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
  maxEventsInOneDay: number;
  sleepAssociatedEvents: number;
  symptomaticOnlyEvents: number;
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

treatmentHistory: {
  name: string;
  activeIngredient?: string;
  dose: string;
  frequency: string;
  prescribedOn?: string;
  status?: string;
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
  treatmentHistory,
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
            <FirstEventChronologyView
                firstEventDate={story.firstEventDate}
                earlyChronology={earlyChronology}
                onDiscoverPatterns={() => setLevel("patterns")}
            />
            </JourneyShell>
        );
        }

    if (level === "patterns") {
      return (
        <JourneyShell
          eyebrow="Patterns"
          title="What repeats?"
          subtitle="The next landmark"
          onZoomOut={() => setLevel("first-event")}
        >
          <PatternsView
            uniqueEventDays={story.uniqueEventDays}
            multiEventDays={story.multiEventDays}
            totalLoggedEvents={story.totalLoggedEvents}
            maxEventsInOneDay={story.maxEventsInOneDay}
            sleepAssociatedEvents={story.sleepAssociatedEvents}
            symptomaticOnlyEvents={story.symptomaticOnlyEvents}
            onFollowTreatment={() => setLevel("treatment")}
          />
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
          <TreatmentView
            daily={treatment.daily}
            sos={treatment.sos}
            emergency={treatment.emergency}
            onSeeHistory={() => setLevel("treatment-history")}
            onSeeEvidence={() => setLevel("evidence")}
          />
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

  if (level === "treatment-history") {
    return (
      <JourneyShell
        eyebrow="Treatment History"
        title="How treatment changed"
        subtitle="Documented medication history"
        onZoomOut={() => setLevel("treatment")}
      >
        <TreatmentHistoryView
          records={treatmentHistory}
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
          <EvidenceLandingView
            laboratoryGroups={evidence.laboratoryGroups}
            drugMonitoring={evidence.drugMonitoring}
            videos={evidence.videos}
            questions={questions}
            onOpenLaboratory={() => setLevel("laboratory")}
            onOpenDrugMonitoring={() => setLevel("drug-monitoring")}
            onOpenVideos={() => setLevel("videos")}
          />
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
