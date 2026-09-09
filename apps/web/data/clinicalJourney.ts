export type ClinicalJourneyMilestone = {
  id: string;

  period: string;

  title: string;

  summary: string;

  evidence: string[];

  sourceType: (
    | "Owner Diary"
    | "Clinical Record"
    | "Prescription"
    | "Laboratory"
    | "Video"
  )[];

  confidence: "owner-reported" | "verified";

  next?: string;
};

export const hopeClinicalJourney: ClinicalJourneyMilestone[] = [

  {
    id: "MS-001",

    period: "May 2025",

    title: "First Clinical Presentation",

    summary:
        "Hope's documented neurological history begins with owner-recorded seizure episodes. This was followed by the first clinical evaluation, after which levetiracetam was initiated as the first documented antiseizure medication.",

    evidence: [
      "EV-0001",
      "EV-0002",
    ],

    sourceType: [
      "Owner Diary",
      "Clinical Record",
    ],

    confidence: "verified",

    next: "MS-002",
  },

  {
    id: "MS-002",

    period: "June–July 2025",

    title: "Early Clinical Course",

    summary:
      "Further seizure episodes continued to be documented after treatment began. Clinical follow-up continued alongside detailed owner diary documentation, providing a longitudinal record of Hope's neurological course.",

    evidence: [
      "EV-0003",
      "EV-0004",
    ],

    sourceType: [
      "Owner Diary",
      "Clinical Record",
    ],

    confidence: "verified",

    next: "MS-003",
  },

  {
    id: "MS-003",

    period: "May–June 2026",

    title: "Treatment Progression",

    summary:
      "As Hope's documented clinical course continued, antiseizure management expanded to include phenobarbital. Subsequent consultations documented medication adjustments and an updated treatment plan.",
    evidence: [
      "EV-0006",
      "EV-0007",
      "EV-0008",
    ],

    sourceType: [
      "Prescription",
      "Clinical Record",
    ],

    confidence: "verified",

    next: "MS-004",
  },

  {
    id: "MS-004",

    period: "June 2026",

    title: "Therapeutic Monitoring",

    summary:
      "Therapeutic drug monitoring and laboratory investigations became part of Hope's ongoing clinical management after treatment progression.",

    evidence: [
      "EV-0009",
    ],

    sourceType: [
      "Laboratory",
    ],

    confidence: "verified",

    next: "MS-005",
  },

  {
    id: "MS-005",

    period: "Current",

    title: "Current Clinical Status",

    summary:
      "Hope remains on long-term antiseizure therapy. His caregiver continues systematic documentation of seizure episodes, videos and clinical records while seeking an independent specialist neurological opinion.",

    evidence: [
      "EV-0001",
      "EV-0008",
    ],

    sourceType: [
      "Owner Diary",
      "Clinical Record",
      "Video",
    ],

    confidence: "verified",
  },

];