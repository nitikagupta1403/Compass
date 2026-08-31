export type OutreachPackageItem = {
  order: number;
  fileName: string;
  category:
    | "Referral Summary"
    | "Evidence Index"
    | "Clinical Record"
    | "Laboratory"
    | "Seizure Diary"
    | "Video";
  include: boolean;
  purpose: string;
  notes?: string;
};

export const hopeOutreachManifest: OutreachPackageItem[] = [
  {
    order: 1,
    fileName: "01_Hope_Compass_Specialist_Referral_v1.0.pdf",
    category: "Referral Summary",
    include: true,
    purpose:
      "Two-page clinician-facing overview of seizure burden, treatment history, therapeutic drug monitoring, video status, and unresolved questions.",
  },

  {
    order: 2,
    fileName: "02_Hope_Compass_Evidence_Index_v1.0.pdf",
    category: "Evidence Index",
    include: true,
    purpose:
      "Source-level map showing which clinical claims are supported by each record, diary source, laboratory report, and video.",
  },

  {
    order: 3,
    fileName: "03_Hope_Seizure_Diary.pdf",
    category: "Seizure Diary",
    include: true,
    purpose:
      "Longitudinal owner-maintained seizure and symptomatic-event record.",
    notes:
      "Diary entries remain owner-recorded and are not treated as independently verified seizure classifications.",
  },

  {
    order: 4,
    fileName: "04_Prescription_Hope_5_Jun_25.jpeg",
    category: "Clinical Record",
    include: true,
    purpose:
      "Initial documented seizure history, suspected idiopathic epilepsy, and levetiracetam treatment.",
  },

  {
    order: 5,
    fileName: "05_Prescription_Hope_21_June_25.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "Levetiracetam continuation and short-course clonazepam/Diamox treatment history.",
  },

  {
    order: 6,
    fileName: "06_Prescription_Hope_9_Jul_25.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "Continuation of levetiracetam and PRN adjunct medication history.",
  },

  {
    order: 7,
    fileName: "07_Prescription_Hope_24_Jul_25.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "LEVEPIL tablet formulation and levetiracetam dose history.",
  },

  {
    order: 8,
    fileName: "08_Prescription_Hope_22_Jan_26.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "Recurrent seizures documented and phenobarbital treatment introduced.",
  },

  {
    order: 9,
    fileName: "09_Prescription_Hope_4_May_26.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "Later phenobarbital regimen documentation.",
  },

  {
    order: 10,
    fileName: "10_Animal_Care_Clinic_27_May_2026.pdf",
    category: "Clinical Record",
    include: true,
    purpose:
      "Weight, medication continuation, and orders for phenobarbital and bile-acid testing.",
    notes:
      "Contains unrelated 'CURIE' text; this remains flagged as a source-document data-quality issue and is not attributed to Hope.",
  },

  {
    order: 11,
    fileName: "11_Animal_Care_Labs_2_Jun_2026.pdf",
    category: "Laboratory",
    include: true,
    purpose:
      "Serum phenobarbital 8.8 with laboratory reference 18–45 and bile acid 0.70 µmol/L with laboratory reference <12.",
    notes:
      "Date of birth in this record conflicts with other available records and remains unresolved.",
  },

  {
    order: 12,
    fileName: "12_VID-0001_Hope_26_May_2026.mp4",
    category: "Video",
    include: true,
    purpose:
      "Primary owner-recorded video evidence for specialist review.",
    notes:
      "Currently unlinked to a specific seizure diary event; clinical phase is not definitively classified.",
  },

  {
    order: 13,
    fileName: "13_VID-0002_Hope_26_May_2026.mp4",
    category: "Video",
    include: true,
    purpose:
      "Primary owner-recorded video evidence for specialist review.",
    notes:
      "Currently unlinked to a specific seizure diary event; clinical phase is not definitively classified.",
  },
];