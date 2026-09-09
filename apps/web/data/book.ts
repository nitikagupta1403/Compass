export type BookChapter = {
  id: string;
  title: string;
  route: string;
  description: string;
};

export const hopeBook: BookChapter[] = [
  {
    id: "referral",
    title: "Seeking Independent Specialist Opinion",
    route: "/patients/HOPE-001/referral",
    description:
      "Purpose of this record and reason for specialist review.",
  },

  {
    id: "hope",
    title: "Hope",
    route: "/patients/HOPE-001/patient",
    description:
      "Patient profile and current clinical context.",
  },

  {
    id: "journey",
    title: "Clinical Journey",
    route: "/patients/HOPE-001/story",
    description:
      "Documented progression of Hope's neurological history.",
  },

  {
    id: "treatment",
    title: "Treatment Journey",
    route: "/patients/HOPE-001/treatment",
    description:
      "Evolution of antiseizure therapy over time.",
  },

  {
    id: "pattern",
    title: "Pattern Recognition",
    route: "/patients/HOPE-001/pattern",
    description:
      "Observed seizure patterns from documented evidence.",
  },

  {
    id: "laboratory",
    title: "Laboratory",
    route: "/patients/HOPE-001/laboratory",
    description:
      "Laboratory investigations and therapeutic monitoring.",
  },

  {
    id: "evidence",
    title: "Evidence",
    route: "/patients/HOPE-001/evidence",
    description:
      "Evidence supporting every clinical milestone.",
  },

  {
    id: "sources",
    title: "Original Records",
    route: "/patients/HOPE-001/source",
    description:
      "Original documents used throughout this record.",
  },
];