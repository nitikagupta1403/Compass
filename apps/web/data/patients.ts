import { Patient } from "../types/patient";

const patients: Patient[] = [
  {
    id: "HOPE-001",

    demographics: {
      name: "Hope",
      species: "Dog",
      breed: "Beagle",
      sex: "Male",
    },

    condition: "Recurrent seizure disorder",

    diagnoses: [
      {
        name: "Idiopathic epilepsy / idiopathic seizures",
        status: "Documented",
        date: "2025-06-05",
        evidenceStatus: "verified",
      },
    ],

    allergies: [],

    medications: [
      {
        name: "Epihat-LC",
        activeIngredient: "Levetiracetam",
        dose: "3.4 mL",
        frequency: "Morning and night",
        prescribedOn: "2025-06-05",
        status: "historical",
        evidenceStatus: "verified",
      },
      {
        name: "Rivotril",
        activeIngredient: "Clonazepam",
        dose: "2 × 0.5 mg tablets",
        frequency: "Twice daily",
        prescribedOn: "2025-06-21",
        duration: "5 days",
        status: "historical",
        evidenceStatus: "verified",
      },
      {
        name: "LEVEPIL",
        activeIngredient: "Levetiracetam",
        dose: "¾ of 500 mg tablet",
        frequency: "Morning and night",
        prescribedOn: "2025-07-24",
        duration: "2 months",
        status: "historical",
        evidenceStatus: "verified",
      },
      {
        name: "Gardenal",
        activeIngredient: "Phenobarbital",
        dose: "¾ of 60 mg tablet",
        frequency: "Twice daily",
        prescribedOn: "2026-01-22",
        duration: "10 days",
        status: "historical",
        evidenceStatus: "verified",
      },
      {
        name: "Gardenal",
        activeIngredient: "Phenobarbital",
        dose: "2 × 30 mg tablets",
        frequency: "Twice daily",
        prescribedOn: "2026-05-04",
        duration: "10 days",
        status: "current-unconfirmed",
        evidenceStatus: "verified",
      },
    ],

    clinicalEvents: [
      {
        id: "CE-0001",
        date: "2025-05-28",
        type: "Seizure",
        title: "First documented seizure",
        summary:
          "Owner-reported episode lasting approximately 4–5 minutes with stiffened forelegs and drooling, followed by post-event confusion.",
        certainty: "owner-reported",
        source: "Prescription_Hope_5_Jun_25.jpeg",
      },

      {
        id: "CE-0002",
        date: "2025-06-04",
        type: "Seizure",
        title: "Second reported seizure",
        summary:
          "Second episode documented retrospectively in the 5 June clinical record. The event date is derived from the note stating it occurred the previous day.",
        certainty: "derived",
        source: "Prescription_Hope_5_Jun_25.jpeg",
      },

      {
        id: "CE-0003",
        date: "2025-06-05",
        type: "Assessment",
        title: "Idiopathic epilepsy suspected",
        summary:
          "Clinical assessment documented suspected idiopathic epilepsy following the reported seizure episodes.",
        certainty: "verified",
        source: "Prescription_Hope_5_Jun_25.jpeg",
      },

      {
        id: "CE-0004",
        date: "2025-06-05",
        type: "Medication",
        title: "Levetiracetam treatment documented",
        summary:
          "Epihat-LC (levetiracetam) prescribed at 3.4 mL morning and night.",
        certainty: "verified",
        source: "Prescription_Hope_5_Jun_25.jpeg",
      },

      {
        id: "CE-0005",
        date: "2025-06-21",
        type: "Medication",
        title: "Adjunct seizure medications prescribed",
        summary:
          "Levetiracetam continued with short-course Diamox and clonazepam.",
        certainty: "verified",
        source: "Prescription_Hope_21_June_25.pdf",
      },

      {
        id: "CE-0006",
        date: "2025-07-24",
        type: "Medication",
        title: "Levetiracetam tablet formulation documented",
        summary:
          "LEVEPIL 500 mg prescribed at three-quarter tablet morning and night.",
        certainty: "verified",
        source: "Prescription_Hope_24_july_25.pdf",
      },

      {
        id: "CE-0007",
        date: "2026-01-22",
        type: "Seizure",
        title: "Recurrent seizures documented",
        summary:
          "Telephonic clinical record documents recurrent seizures while levetiracetam and clonazepam were reported as medications.",
        certainty: "verified",
        source: "Prescription_Hope_22_jan_26.pdf",
      },

      {
        id: "CE-0008",
        date: "2026-01-22",
        type: "Medication",
        title: "Phenobarbital prescribed",
        summary:
          "Gardenal 60 mg prescribed at three-quarter tablet twice daily for 10 days.",
        certainty: "verified",
        source: "Prescription_Hope_22_jan_26.pdf",
      },

      {
        id: "CE-0009",
        date: "2026-05-04",
        type: "Medication",
        title: "Phenobarbital regimen documented",
        summary:
          "Gardenal 30 mg prescribed at two tablets twice daily for 10 days.",
        certainty: "verified",
        source: "Prescription_Hope_4_May_26.pdf",
      },

      {
        id: "CE-0010",
        date: "2026-06-02",
        type: "Therapeutic Drug Monitoring",
        title: "Phenobarbital below laboratory reference range",
        summary:
          "Serum phenobarbital measured 8.8. Laboratory reference interval was 18–45 and the report labelled the result subtherapeutic.",
        certainty: "verified",
        source: "RecentPres.pdf",
      },

      {
        id: "CE-0011",
        date: "2026-06-02",
        type: "Lab",
        title: "Bile acid reported normal",
        summary:
          "Random/post-prandial bile acid measured 0.70 µmol/L against laboratory reference <12 µmol/L.",
        certainty: "verified",
        source: "RecentPres.pdf",
      },
    ],

    reports: [
      {
        date: "2026-06-02",
        title: "Serum Phenobarbital",
        summary:
          "Phenobarbital 8.8; laboratory reference interval 18–45. Report labelled subtherapeutic.",
        source: "RecentPres.pdf",
      },
      {
        date: "2026-06-02",
        title: "Bile Acid",
        summary:
          "Random/post-prandial bile acid 0.70 µmol/L; laboratory reference <12 µmol/L. Report states normal.",
        source: "RecentPres.pdf",
      },
    ],
  },
];

export default patients;