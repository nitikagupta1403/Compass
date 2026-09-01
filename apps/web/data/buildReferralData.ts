import { PatientRecord } from "@/data/loadPatient";
import { SeizureEvent } from "@/types/seizure";
import { VideoRecord } from "@/data/loadVideos";
import { MedicationRecord } from "@/data/loadMedications";
import { calculateSeizureMetrics } from "@/data/seizureMetrics";
import { LaboratoryRecord } from "@/data/loadLaboratory";

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

  laboratoryGroups: {
    id: string;
    title: string;
    latestDate: string | null;
    latestSummary: string;
    latestCompactSummary: string;
    history: {
      date: string;
      summary: string;
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
    }[];
  };

  unresolvedIssues: string[];
};

export function buildReferralData(
  patient: PatientRecord,
  seizures: SeizureEvent[],
  videos: VideoRecord[],
  medications: MedicationRecord[],
  laboratory: LaboratoryRecord[]
): ReferralData {
  const metrics = calculateSeizureMetrics(seizures);

  const workingDiagnosis =
    patient.primaryDiagnosis.length > 0
      ? patient.primaryDiagnosis[0]
      : null;

  /*
   * Therapeutic drug monitoring
   */

  const therapeuticDrugMonitoring = laboratory.flatMap((record) =>
    record.panels
      .filter((panel) =>
        panel.name.toLowerCase().includes("phenobarbital")
      )
      .flatMap((panel) =>
        panel.analytes.map((analyte) => ({
          title: panel.name,
          date: record.date,
          summary: [
            `${analyte.name}: ${analyte.result}${
              analyte.unit ? ` ${analyte.unit}` : ""
            }`,
            analyte.referenceRange
              ? `Reference range: ${analyte.referenceRange}`
              : null,
            analyte.sourceInterpretation
              ? `Source interpretation: ${analyte.sourceInterpretation}`
              : null,
          ]
            .filter(Boolean)
            .join(" · "),
        }))
      )
  );

  /*
   * Laboratory formatting
   */

  const formatAnalytes = (
    analytes: LaboratoryRecord["panels"][number]["analytes"]
  ) =>
    analytes
      .map((analyte) => {
        const value = `${analyte.name}: ${analyte.result}${
          analyte.unit ? ` ${analyte.unit}` : ""
        }`;

        const range = analyte.referenceRange
          ? `range ${analyte.referenceRange}`
          : null;

        const flag = analyte.sourceFlag
          ? `source flag ${analyte.sourceFlag}`
          : null;

        const interpretation =
          analyte.sourceInterpretation
            ? `source: ${analyte.sourceInterpretation}`
            : null;

        return [
          value,
          range,
          flag,
          interpretation,
        ]
          .filter(Boolean)
          .join(" · ");
      })
      .join(" | ");

  /*
   * Laboratory semantic groups
   */

  const laboratoryGroupDefinitions = [
    {
      id: "bile-acids",
      title: "Bile acids",
      matches: (name: string) =>
        name.toLowerCase().includes("bile acid"),
    },

    {
      id: "hematology",
      title: "CBC / Hematology",
      matches: (name: string) => {
        const value = name.toLowerCase();

        return (
          value.includes("cbc") ||
          value.includes("hematology")
        );
      },
    },

    {
      id: "liver-function",
      title: "Liver function",
      matches: (name: string) =>
        name
          .toLowerCase()
          .includes("liver function"),
    },

    {
      id: "kidney-function",
      title: "Kidney function",
      matches: (name: string) =>
        name
          .toLowerCase()
          .includes("kidney function"),
    },

    {
      id: "electrolytes",
      title: "Electrolytes",
      matches: (name: string) =>
        name
          .toLowerCase()
          .includes("electrolyte"),
    },

    {
      id: "chemistry",
      title: "Other chemistry",
      matches: (name: string) => {
        const value = name.toLowerCase();

        return (
          value.includes("other chemistry") ||
          value.includes("canine / dogs")
        );
      },
    },
  ];

  const laboratoryGroups =
    laboratoryGroupDefinitions
      .map((group) => {
        const entries = laboratory
          .flatMap((record) =>
            record.panels
              .filter((panel) =>
                group.matches(panel.name)
              )
              .map((panel) => {
                const notableAnalytes =
                  panel.analytes.filter(
                    (analyte) =>
                      analyte.sourceFlag ||
                      analyte.sourceInterpretation
                  );

                const compactSummary =
                  notableAnalytes.length > 0
                    ? `${
                        notableAnalytes.length
                      } source-reported finding${
                        notableAnalytes.length === 1
                          ? ""
                          : "s"
                      }`
                    : `${
                        panel.analytes.length
                      } analytes recorded`;

                return {
                  date: record.date,
                  summary: formatAnalytes(
                    panel.analytes
                  ),
                  compactSummary,
                };
              })
          )
          .sort((a, b) =>
            b.date.localeCompare(a.date)
          );

        if (entries.length === 0) {
          return null;
        }

        const [latest, ...history] =
          entries;

        return {
          id: group.id,
          title: group.title,
          latestDate: latest.date,
          latestSummary: latest.summary,
          latestCompactSummary:
            latest.compactSummary,

          history: history.map((entry) => ({
            date: entry.date,
            summary: entry.summary,
          })),
        };
      })
      .filter(
        (
          group
        ): group is {
          id: string;
          title: string;
          latestDate: string;
          latestSummary: string;
          latestCompactSummary: string;
          history: {
            date: string;
            summary: string;
          }[];
        } => group !== null
      );

  /*
   * Video evidence
   */

  const unlinkedVideos = videos.filter(
    (video) =>
      video.eventLinkStatus === "unlinked"
  ).length;

  /*
   * Final referral object
   */

  return {
    patientId: patient.id,

    patientName:
      patient.name,

    species:
      patient.species,

    breed:
      patient.breed,

    sex:
      patient.sex,

    clinicalProblem: patient.clinicalProblem,

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
        metrics.multiEventDays.length,

      symptomaticOnlyEvents:
        metrics.symptomaticOnlyEvents,
    },

    medications: medications.map(
      (medication) => ({
        name: medication.drug,

        activeIngredient:
          medication.activeIngredient ??
          undefined,

        dose:
          medication.dose?.amount !== null &&
          medication.dose?.amount !==
            undefined
            ? `${medication.dose.amount} ${medication.dose.unit}`
            : "",

        frequency:
          medication.schedule ?? "",

        prescribedOn:
          medication.prescribedOn,

        status:
          medication.status,
      })
    ),

    therapeuticDrugMonitoring,

    laboratoryGroups,

    videoEvidence: {
      totalVideos: videos.length,

      unlinkedVideos,

      specialistReviewRequired:
        videos.some(
          (video) =>
            video.specialistReviewRequired
        ),

      records: videos.map(
        (video) => ({
          id: video.id,
          date: video.date,
          time: video.time,

          durationSeconds:
            video.durationSeconds,

          eventLinkStatus:
            video.eventLinkStatus,

          clinicalContext:
            video.clinicalContext,

          observedEvidence:
            video.observedEvidence,

          seizureOnsetCaptured:
            video.seizureOnsetCaptured,

          seizureClassificationAssigned:
            video.seizureClassificationAssigned,
        })
      ),
    },

    unresolvedIssues: [
      "Seizure phenotype and classification require specialist review.",
        ...patient.sourceDiscrepancies
      ?.filter(
        (discrepancy) => discrepancy.field === "dateOfBirth"
      )
      .map(
        (discrepancy) =>
          `Conflicting date-of-birth values remain present in source records; Compass canonical DOB is ${discrepancy.canonicalValue}.`
      ) ?? [],

    "Priority for further neurological diagnostic work-up requires specialist review.",
  ],
  };
}