"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import VideoEvidenceView from "./VideoEvidenceView";
import DrugMonitoringView from "./DrugMonitoringView";
import LaboratoryEvidenceView from "./LaboratoryEvidenceView";
import BileAcidEvidenceView from "./BileAcidEvidenceView";
import FirstEventChronologyView from "./FirstEventChronologyView";
import PatternsView from "./PatternsView";
import TreatmentView from "./TreatmentView";
import EvidenceLandingView from "./EvidenceLandingView";
import TreatmentHistoryView from "./TreatmentHistoryView";
import EvidenceRecordDrawer from "./EvidenceRecordDrawer";
import type { EvidenceRecord } from "./evidenceTypes";

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
  shareToken?: string;

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
  shareToken,
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

    const [evidenceContext, setEvidenceContext] =
      useState<
        "treatment" | "first-event" | "patterns" | null
      >(null);

    const [focusedEvidence, setFocusedEvidence] =
      useState<EvidenceRecord | null>(null);

    const cameraRef = useRef<HTMLDivElement>(null);

    const moveCamera = async (
      nextLevel: DepthLevel,
      direction: "in" | "out" = "in"
    ) => {
      const root = document.documentElement;

      const transitionClass =
        direction === "in"
          ? "wonderland-camera-in"
          : "wonderland-camera-out";

      const documentWithTransition = document as Document & {
        startViewTransition?: (
          callback: () => void
        ) => {
          finished: Promise<void>;
        };
      };

      if (!documentWithTransition.startViewTransition) {
        setLevel(nextLevel);
        return;
      }

      root.classList.add(transitionClass);

      const transition =
        documentWithTransition.startViewTransition(() => {
          flushSync(() => {
            setLevel(nextLevel);
          });
        });

      try {
        await transition.finished;
      } finally {
        root.classList.remove(transitionClass);
      }
    };

  if (level === "hope") {
    return (
      <div ref={cameraRef} className="origin-center">
        <div className="rounded-3xl border border-teal-900/15 bg-teal-950/[0.02] p-10">
          <div className="flex min-h-[430px] items-center justify-center">
            <button
              type="button"
              onClick={() =>
                  moveCamera("know-hope", "in")
                }
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
      </div>
    );
}

  if (level === "know-hope") {
    return (
      <div ref={cameraRef} className="origin-center">
        <div className="rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm">
          <ZoomOut
              onClick={() =>
                moveCamera("hope", "out")
              }
            />
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full border border-teal-800/20 bg-teal-50/20 p-2">
                <img src={photoSrc} alt={patientName} className="h-28 w-28 rounded-full object-cover" />
              </div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {patientName}
              </h2>
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
              <JourneyButton
                  onClick={() => moveCamera("know-more", "in")}
                  label="Explore Hope's Story →"
                />
            </div>
          </div>
        </div>
      </div>
    );
}

  if (level === "know-more") {
  return (
    <div ref={cameraRef} className="origin-center">
      <div className="rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm">
        <ZoomOut
          onClick={() =>
            moveCamera("know-hope", "out")
          }
        />

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">
              Hope Story
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Hope Story
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The distant view
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <StoryLandmark
              title="First Event"
              subtitle="Where the story begins"
              onClick={() =>
                moveCamera("first-event", "in")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

if (level === "first-event") {
  return (
    <div ref={cameraRef} className="origin-center">
      <JourneyShell
        eyebrow="First Event"
        title="The story begins"
        subtitle="The first clinical landmark"
        trail={[
          { label: "Hope", onClick: () => setLevel("hope") },
          { label: "Story", onClick: () => moveCamera("know-more", "in")},
          { label: "First Event" },
        ]}
        onZoomOut={() => moveCamera("know-more", "out")}
      >
        <FirstEventChronologyView
          firstEventDate={story.firstEventDate}
          earlyChronology={earlyChronology}
          onDiscoverPatterns={() =>
            moveCamera("patterns", "in")
          }
          onSeeEvidence={() => {
            setEvidenceContext("first-event");
            moveCamera("evidence", "out");
          }}
        />
      </JourneyShell>
    </div>
  );
}

if (level === "patterns") {
  return (
    <div ref={cameraRef} className="origin-center">
      <JourneyShell
        eyebrow="Patterns"
        title="What repeats?"
        subtitle="The next landmark"
        trail={[
          { label: "Hope", onClick: () => setLevel("hope") },
          { label: "Story", onClick: () => moveCamera("know-more", "out") },
          {
            label: "First Event",
            onClick: () =>
              moveCamera("first-event", "out"),
          },
          { label: "Patterns" },
        ]}
        onZoomOut={() => 
          moveCamera("first-event", "out")
        }
      >
        <PatternsView
          uniqueEventDays={story.uniqueEventDays}
          multiEventDays={story.multiEventDays}
          totalLoggedEvents={story.totalLoggedEvents}
          maxEventsInOneDay={story.maxEventsInOneDay}
          sleepAssociatedEvents={story.sleepAssociatedEvents}
          symptomaticOnlyEvents={story.symptomaticOnlyEvents}
          onFollowTreatment={() =>
            moveCamera("treatment", "in")
          }
          onSeeEvidence={() => {
            setEvidenceContext("patterns");
            moveCamera("evidence", "out");
          }}
        />
      </JourneyShell>
    </div>
  );
}
    if (level === "treatment") {
      return (
        <div ref={cameraRef} className="origin-center">
          <JourneyShell
            eyebrow="Treatment"
            title="What changed?"
            subtitle="The treatment landmark"
            trail={[
              { label: "Hope", onClick: () => setLevel("hope") },
              { label: "Story", onClick: () => moveCamera("know-more", "in") },
              { label: "First Event", onClick: () => setLevel("first-event") },
              {
                label: "Patterns",
                onClick: () =>
                  moveCamera("patterns", "out"),
              },
              { label: "Treatment" },
            ]}
            onZoomOut={() =>
              moveCamera("patterns", "out")
            }
          >
          <TreatmentView
            daily={treatment.daily}
            sos={treatment.sos}
            emergency={treatment.emergency}
            onSeeHistory={() =>
              moveCamera("treatment-history", "in")
            }
            onSeeEvidence={() => {
              setEvidenceContext("treatment");
              moveCamera("evidence", "in");
            }}
          />
              </JourneyShell>
    </div>
  );
}

    if (level === "laboratory") {
      return (
        <div ref={cameraRef} className="origin-center">
          <JourneyShell
            eyebrow="Laboratory"
            title="Laboratory evidence"
            subtitle="A closer evidence view"
            trail={[
              { label: "Hope", onClick: () => setLevel("hope") },
              { label: "Story", onClick: () => moveCamera("know-more", "in")},
              { label: "Evidence", onClick: () => moveCamera("evidence", "out") },
              { label: "Laboratory" },
            ]}
            onZoomOut={() => moveCamera("evidence", "out")}
            depth="source"
          >
            <LaboratoryEvidenceView
              groups={laboratoryGroups}
              onOpenBileAcids={() =>
                moveCamera("bile-acids", "in")
              }
            />
          </JourneyShell>
        </div>
      );
    }

  if (level === "treatment-history") {
  return (
    <div ref={cameraRef} className="origin-center">
      <JourneyShell
        eyebrow="Treatment History"
        title="How treatment changed"
        subtitle="Documented medication history"
        onZoomOut={() =>
          moveCamera("treatment", "out")
        }
      >
        <TreatmentHistoryView
          records={treatmentHistory}
        />
      </JourneyShell>
    </div>
  );
}

if (level === "evidence") {
    const evidenceTitle =
      evidenceContext === "treatment"
      ? "Evidence beneath treatment"
      : evidenceContext === "first-event"
      ? "Evidence beneath the first events"
      : evidenceContext === "patterns"
      ? "Evidence beneath the patterns"
      : "Evidence beneath the story";

  const evidenceSubtitle =
    evidenceContext === "treatment"
      ? "Open the records that support the documented treatment history"
      : evidenceContext === "first-event"
      ? "Open the records that support the beginning of Hope’s story"
      : evidenceContext === "patterns"
      ? "Open the records that support Hope’s longitudinal event patterns"
      : "Open the records that support each layer";

const evidenceTrail: JourneyTrailItem[] =
  evidenceContext === "treatment"
    ? [
        { label: "Hope", onClick: () => setLevel("hope") },
        { label: "Story", onClick: () => moveCamera("know-more", "in") },
        { label: "First Event", onClick: () => setLevel("first-event") },
        { label: "Patterns", onClick: () => setLevel("patterns") },
        { label: "Treatment", onClick: () => setLevel("treatment") },
        { label: "Evidence" },
      ]
    : evidenceContext === "patterns"
    ? [
        { label: "Hope", onClick: () => setLevel("hope") },
        { label: "Story", onClick: () => moveCamera("know-more", "in") },
        { label: "First Event", onClick: () => setLevel("first-event") },
        { label: "Patterns", onClick: () => setLevel("patterns") },
        { label: "Evidence" },
      ]
    : evidenceContext === "first-event"
    ? [
        { label: "Hope", onClick: () => setLevel("hope") },
        { label: "Story", onClick: () => moveCamera("know-more", "in") },
        { label: "First Event", onClick: () => setLevel("first-event") },
        { label: "Evidence" },
      ]
    
    : [
        { label: "Hope", onClick: () => setLevel("hope") },
        { label: "Story", onClick: () => moveCamera("know-more", "in") },
        { label: "Evidence" },
      ];

    const evidenceZoomOut = () => {
      if (evidenceContext === "first-event") {
        moveCamera("first-event", "out");
        return;
      }

      if (evidenceContext === "patterns") {
        moveCamera("patterns", "out");
        return;
      }

      moveCamera("treatment", "out");
    };
  return (
    <div ref={cameraRef} className="origin-center">
      <JourneyShell
        eyebrow="Evidence"
        title={evidenceTitle}
        subtitle={evidenceSubtitle}
        trail={evidenceTrail}
        onZoomOut={evidenceZoomOut}
        depth="evidence"
      >

    <EvidenceLandingView
      laboratoryGroups={evidence.laboratoryGroups}
      drugMonitoring={evidence.drugMonitoring}
      videos={evidence.videos}
      questions={questions}
      context={evidenceContext}
      onOpenLaboratory={() =>
        moveCamera("laboratory", "in")
      }

      onOpenDrugMonitoring={() =>
        moveCamera("drug-monitoring", "in")
      }

      onOpenVideos={() =>
        moveCamera("videos", "in")
      }
    />
              </JourneyShell>
    </div>
  );
}

    if (level === "videos") {
      return (
        <div ref={cameraRef} className="origin-center">
          <>
            <JourneyShell
            eyebrow="Videos"
            title="Video evidence"
            subtitle="A closer evidence view"
            onZoomOut={() => moveCamera("evidence", "out")}
            depth="source"
            trail={[
              { label: "Hope", onClick: () => setLevel("hope") },
              { label: "Story", onClick: () => moveCamera("know-more", "in") },
              { label: "Evidence", onClick: () => moveCamera("evidence", "out") },
              { label: "Videos" },
            ]}
          >
            <VideoEvidenceView
              patientId={patient.patientId}
              shareToken={shareToken}
              records={videoEvidence.records}
              onInspectRecord={(record) =>
                setFocusedEvidence(record)
              }
            />
          </JourneyShell>

          <EvidenceRecordDrawer
            record={focusedEvidence}
            patientId={patient.patientId}
            shareToken={shareToken}
            onClose={() => setFocusedEvidence(null)}
          />
      </>
    </div>
  );
}

      if (level === "bile-acids") {
        const bileAcids =
          laboratoryGroups.find(
            (group) =>
              group.title.toLowerCase() === "bile acids"
          ) ?? null;

        return (
          <div ref={cameraRef} className="origin-center">
            <>
              <JourneyShell
                eyebrow="Bile Acids"
                title="Bile acid evidence"
                subtitle="Exact laboratory record"
                trail={[
                  { label: "Hope", onClick: () => setLevel("hope") },
                  { label: "Story", onClick: () => moveCamera("know-more", "in") },
                  {
                    label: "Evidence",
                    onClick: () =>
                      moveCamera("evidence", "out"),
                  },
                  {
                    label: "Laboratory",
                    onClick: () =>
                      moveCamera("laboratory", "out"),
                  },
                  { label: "Bile Acids" },
                ]}
                onZoomOut={() =>
                  moveCamera("laboratory", "out")
                }
                depth="source"
              >
                <BileAcidEvidenceView
                    patientId={patient.patientId}
                    shareToken={shareToken}
                    bileAcids={bileAcids}
                    onInspectRecord={(record) =>
                      setFocusedEvidence(record)
                    }
                  />
              </JourneyShell>

              <EvidenceRecordDrawer
                record={focusedEvidence}
                patientId={patient.patientId}
                shareToken={shareToken}
                onClose={() => setFocusedEvidence(null)}
              />
            </>
          </div>
        );
      }
              
 if (level === "drug-monitoring") {
    return (
      <div ref={cameraRef} className="origin-center">
        <>
          <JourneyShell
        eyebrow="Drug Monitoring"
        title="Therapeutic drug monitoring"
        subtitle="A closer evidence view"
        trail={[
          { label: "Hope", onClick: () => setLevel("hope") },
          { label: "Story", onClick: () => moveCamera("know-more", "in")},
          { label: "Evidence", onClick: () => moveCamera("evidence", "out") },
          { label: "Drug Monitoring" },
        ]}
        onZoomOut={() => moveCamera("evidence", "out")}
        depth="source"
      >
        <DrugMonitoringView
          patientId={patient.patientId}
          shareToken={shareToken}
          records={drugMonitoringRecords}
          onInspectRecord={(record) =>
            setFocusedEvidence(record)
          }
        />
      </JourneyShell>

      <EvidenceRecordDrawer
        record={focusedEvidence}
        patientId={patient.patientId}
        shareToken={shareToken}
        onClose={() => setFocusedEvidence(null)}
      />
      </>
    </div>
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

type JourneyTrailItem =
  | string
  | {
      label: string;
      onClick?: () => void;
    };

function JourneyTrail({
  items,
}: {
  items: JourneyTrailItem[];
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
      {items.map((item, index) => {
        const label =
          typeof item === "string" ? item : item.label;

        const onClick =
          typeof item === "string"
            ? undefined
            : item.onClick;

        const isCurrent =
          index === items.length - 1;

        return (
          <div
            key={`${label}-${index}`}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <span className="h-px w-8 bg-slate-200" />
            )}

            {onClick && !isCurrent ? (
              <button
                type="button"
                onClick={onClick}
                className="rounded-full px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-teal-50 hover:text-teal-800"
                style={{
                  cursor:
                    'url("/paw-cursor-pink.png") 16 16, pointer',
                }}
              >
                {label}
              </button>
            ) : (
              <span
                className={
                  isCurrent
                    ? "relative rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-800 shadow-sm"
                    : "px-2 py-1 text-xs font-medium text-slate-400"
                }
              >
                {isCurrent && (
                  <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange-400 ring-2 ring-white" />
                )}

                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

  function JourneyShell({
    eyebrow,
    title,
    subtitle,
    trail,
    onZoomOut,
    children,
    depth,
  }: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trail?: JourneyTrailItem[];
    onZoomOut: () => void;
    children: React.ReactNode;
    depth?: "evidence" | "source";
  }) {
    return (
      <div
  className={
          depth === "source"
            ? "rounded-3xl border border-slate-300 bg-slate-100/80 p-10 shadow-inner"
            : depth === "evidence"
            ? "rounded-3xl border border-teal-900/20 bg-slate-50/70 p-10 shadow-sm"
            : "rounded-3xl border border-teal-900/15 bg-white p-10 shadow-sm"
        }
      >
        <ZoomOut onClick={onZoomOut} />

        <div className="mx-auto mt-10 max-w-5xl">
          {trail && <JourneyTrail items={trail} />}

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-800">
              {eyebrow}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
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
}
