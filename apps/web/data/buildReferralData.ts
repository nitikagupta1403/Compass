import { Patient } from "@/types/patient";
import { SeizureEvent } from "@/types/seizure";
import { VideoRecord } from "@/data/loadVideos";
import { calculateSeizureMetrics } from "@/data/seizureMetrics";

export type ReferralData = {
  patientId: string;
  patientName: string;
  species: string;
  breed: string;
  sex: string;

  clinicalProblem: string;
  workingDiagnosis: string | null;

  seizureDiary: {
    totalLoggedEvents: number;
    uniqueEventDays: number;
    firstEventDate: string | null;
    lastEventDate: string | null;
    maxEventsInOneDay: number;
    multiEventDays: number;
    symptomaticOnlyEvents: number;
  };

  medications: {
    name: string;
    activeIngredient?: string;
    dose: string;
    frequency: string;
    prescribedOn?: string;
    status?: string;
  }[];

  therapeuticDrugMonitoring: {
    title: string;
    date: string;
    summary: string;
  }[];

  videoEvidence: {
    totalVideos: number;
    unlinkedVideos: number;
    specialistReviewRequired: boolean;
  };

  unresolvedIssues: string[];
};

export function buildReferralData(
  patient: Patient,
  seizures: SeizureEvent[],
  videos: VideoRecord[]
): ReferralData {
  const metrics = calculateSeizureMetrics(seizures);

  const workingDiagnosis =
    patient.diagnoses.length > 0
      ? patient.diagnoses[0].name
      : null;

  const therapeuticDrugMonitoring =
    patient.reports
      .filter((report) =>
        report.title
          .toLowerCase()
          .includes("phenobarbital")
      )
      .map((report) => ({
        title: report.title,
        date: report.date,
        summary: report.summary,
      }));

  const unlinkedVideos = videos.filter(
    (video) =>
      video.eventLinkStatus === "unlinked"
  ).length;

  return {
    patientId: patient.id,

    patientName: patient.demographics.name,
    species: patient.demographics.species,
    breed: patient.demographics.breed,
    sex: patient.demographics.sex,

    clinicalProblem: patient.condition,

    workingDiagnosis,

    seizureDiary: {
      totalLoggedEvents:
        metrics.totalLoggedEvents,

      uniqueEventDays:
        metrics.uniqueEventDays,

      firstEventDate:
        metrics.firstEventDate,

      lastEventDate:
        metrics.lastEventDate,

      maxEventsInOneDay:
        metrics.maxEventsInOneDay,

      multiEventDays:
        metrics.clusterDays.length,

      symptomaticOnlyEvents:
        metrics.symptomaticOnlyEvents,
    },

    medications: patient.medications.map(
      (medication) => ({
        name: medication.name,
        activeIngredient:
          medication.activeIngredient,
        dose: medication.dose,
        frequency: medication.frequency,
        prescribedOn:
          medication.prescribedOn,
        status: medication.status,
      })
    ),

    therapeuticDrugMonitoring,

    videoEvidence: {
      totalVideos: videos.length,
      unlinkedVideos,
      specialistReviewRequired:
        videos.length > 0,
    },

    unresolvedIssues: [
      "Current antiseizure maintenance regimen requires confirmation.",
      "Seizure phenotype and classification require specialist review.",
      "Date of birth remains inconsistent across available clinical records.",
      "Priority for further neurological diagnostic work-up requires specialist review.",
    ],
  };
}