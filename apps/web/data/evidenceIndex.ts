export type EvidenceIndexItem = {
  id: string;
  date: string;
  category:
    | "Clinical Record"
    | "Prescription"
    | "Laboratory"
    | "Owner Diary"
    | "Video";
  sourceFile: string;
  sourceFiles?: string[];
  supports: string[];
  status:
    | "verified"
    | "owner-reported"
    | "derived"
    | "requires-review";
  notes?: string;
};

export const hopeEvidenceIndex: EvidenceIndexItem[] = [
  {
    id: "EV-0001",

    date: "2025-05-28",

    category: "Owner Diary",

    sourceFile: "Hope_seizure_log.pages",

    sourceFiles: [
      "03_Hope_Seizure_Diary_updated.pdf",
    ],

    supports: [
      "Longitudinal seizure and symptomatic-event history",
      "Event dates and times",
      "Episode duration where recorded",
      "Sleep association where recorded",
      "Multi-event day pattern",
      "Owner-described semiology",
    ],

    status: "owner-reported",

    notes:
      "Primary owner-maintained diary source is Hope_seizure_log.pages. 03_Hope_Seizure_Diary_updated.pdf is a Compass PDF export/continuation of the owner diary and is preserved as a separate source representation.",
  },

  {
    id: "EV-0002",
    date: "2025-06-05",
    category: "Clinical Record",

    sourceFile: "Prescription_Hope_5_Jun_25.jpeg",

    sourceFiles: [
      "Prescription_Hope_5_June_back_25.jpeg",
    ],

    supports: [
      "First clinically documented seizure history",
      "Stiffened forelegs and drooling",
      "Post-event confusion",
      "Idiopathic epilepsy suspected",
      "Levetiracetam treatment documented",
    ],

    status: "verified",
  },

  {
    id: "EV-0003",
    date: "2025-06-21",
    category: "Prescription",
    sourceFile: "Prescription_Hope_21_June_25.pdf",
    supports: [
      "Levetiracetam prescription",
      "Short-course clonazepam prescription",
      "Short-course Diamox prescription",
    ],
    status: "verified",
  },

  {
    id: "EV-0004",
    date: "2025-07-09",
    category: "Prescription",
    sourceFile: "Prescription_Hope_9_july_25.pdf",
    supports: [
      "Continuation of levetiracetam",
      "PRN clonazepam and Diamox",
      "Supportive medication history",
    ],
    status: "verified",
  },

  {
    id: "EV-0005",
    date: "2025-07-24",
    category: "Prescription",
    sourceFile: "Prescription_Hope_24_july_25.pdf",
    supports: [
      "LEVEPIL tablet formulation",
      "Levetiracetam dose history",
    ],
    status: "verified",
  },

  {
    id: "EV-0006",
    date: "2026-01-22",
    category: "Clinical Record",
    sourceFile: "Prescription_Hope_22_jan_26.pdf",
    supports: [
      "Recurrent seizures documented",
      "Idiopathic seizures documented",
      "Phenobarbital prescription",
      "Concurrent levetiracetam and clonazepam history",
    ],
    status: "verified",
  },

  {
    id: "EV-0007",
    date: "2026-05-04",
    category: "Prescription",
    sourceFile: "Prescription_Hope_4_May_26.pdf",
    supports: [
      "Phenobarbital regimen documented",
      "Gardenal 30 mg, 2 tablets morning and 2 tablets night documented",
    ],
    status: "verified",
  },

{
  id: "EV-0008",

  date: "2026-06-20",

  category: "Clinical Record",

  sourceFile:
    "Animal_Care_Clinical_20_Jun_2026.pdf",

  supports: [
    "Weight documented as 19 kg",
    "Epihat 3/4 tablet SOS documented",
    "Clonazepam advised to stop",
    "Medazolam intranasal emergency instruction documented",
    "Gardenal 60 mg one tablet twice daily documented",
  ],

  status: "verified",

  notes:
    "Clinical review dated 20 June 2026. Source wording is preserved where clinically important.",
},

  {
  id: "EV-0009",

  date: "2026-06-02",

  category: "Laboratory",

  sourceFile: "Phen_levels.pdf",

  supports: [
    "Serum phenobarbital 8.8",
    "Laboratory reference interval 18–45",
    "Laboratory-labelled subtherapeutic result",
    "Bile acid 0.70 µmol/L",
    "Laboratory reference <12 µmol/L",
    "Bile acid reported normal",
  ],

  status: "verified",

  notes:
    "Animal Care laboratory record dated 2 June 2026. Date of birth in this record conflicts with other available records and remains unresolved.",
},

  
{
  id: "VID-0001",
  date: "2025-07-18",
  category: "Video",
  sourceFile: "Hope_fit_video 2026-05-25.mp4",
  supports: [
    "Primary owner-recorded video evidence",
    "Video evidence from the 18 July 2025 seizure event sequence",
    "Post-event/recovery observations requiring specialist review",
  ],
  status: "requires-review",
  notes:
    "Owner-confirmed video date is 2025-07-18. The current filename contains 2026-05-25; this filename-date discrepancy is preserved. Specialist review remains required.",
},

  {
    id: "VID-0002",
    date: "2026-05-26",
    category: "Video",
    sourceFile: "Hope_fit_video 2026-05-26 at 12.07.46.mp4",
    supports: [
      "Primary owner-recorded video evidence",
      "Post-event/recovery observations requiring specialist review",
    ],
    status: "requires-review",
    notes:
      "Not currently linked to a specific seizure diary event.",
  },
];