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
    supports: [
      "Longitudinal seizure and symptomatic-event history",
      "Event dates and times",
      "Episode duration where recorded",
      "Sleep association where recorded",
      "Multi-event day pattern",
      "Owner-described semiology",
    ],
    status: "owner-reported",
  },

  {
    id: "EV-0002",
    date: "2025-06-05",
    category: "Clinical Record",
    sourceFile: "Prescription_Hope_5_Jun_25.jpeg",
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
    sourceFile: "Prescription_Hope_9_Jul_25.pdf",
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
      "Gardenal 30 mg prescription",
    ],
    status: "verified",
  },

  {
    id: "EV-0008",
    date: "2026-05-27",
    category: "Clinical Record",
    sourceFile: "Animal_Care_Clinic_27_May_2026",
    supports: [
      "Weight documented as 19 kg",
      "Serum phenobarbital testing ordered",
      "Bile acid testing ordered",
      "Continuation of medication documented",
    ],
    status: "verified",
    notes:
      "Record contains unrelated text referring to 'CURIE'; Compass excludes this as a Hope clinical fact.",
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
      "Date of birth in this record conflicts with other available records and remains unresolved.",
  },

  {
    id: "VID-0001",
    date: "2025-07-18",
    category: "Video",
    sourceFile: "Hope_fit_video 2026-05-26 at 12.07.04.mp4",
    supports: [
      "Primary owner-recorded video evidence",
      "Post-event/recovery observations requiring specialist review",
    ],
    status: "requires-review",
    notes:
      "Owner-confirmed recording date is 2025-07-18. The source filename contains 2026-05-26 and is preserved as a filename-date discrepancy. Not currently linked to a specific seizure diary event.",
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