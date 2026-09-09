export type StorySection = {
  id: string;
  period: string;
  title: string;
  events: string[];
  evidence: string[];
  notes?: string;
};

export const hopeStory: StorySection[] = [
  {
    id: "chapter-001",
    period: "May 2025",
    title: "The Beginning",
    events: [
      "First documented seizure.",
      "Initial clinical assessment performed.",
      "Levetiracetam treatment initiated.",
    ],
    evidence: [
      "EV-0001",
      "EV-0002",
    ],
  },

  {
    id: "chapter-002",
    period: "June–July 2025",
    title: "Early Course",
    events: [
      "Further seizure episodes documented.",
      "Multiple seizure days recorded in the owner diary.",
      "Treatment continued with clinical follow-up.",
    ],
    evidence: [
      "EV-0003",
      "EV-0004",
    ],
  },

  {
    id: "chapter-003",
    period: "January–June 2026",
    title: "Treatment Evolution",
    events: [
      "Phenobarbital introduced.",
      "Therapeutic drug monitoring performed.",
      "Treatment adjusted according to subsequent clinical review.",
    ],
    evidence: [
      "EV-0006",
      "EV-0007",
      "EV-0008",
      "EV-0009",
    ],
  },

  {
    id: "chapter-004",
    period: "Current",
    title: "Today",
    events: [
      "Current treatment regimen ongoing.",
      "Owner continues detailed seizure documentation.",
      "Specialist neurological review requested.",
    ],
    evidence: [
      "EV-0001",
      "VID-0001",
      "VID-0002",
    ],
  },
];