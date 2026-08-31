export type EvidenceStatus =
  | "verified"
  | "owner-reported"
  | "derived"
  | "unverified";

export type Medication = {
  name: string;
  activeIngredient?: string;
  dose: string;
  frequency: string;
  prescribedOn?: string;
  duration?: string;

  status?:
    | "prescribed"
    | "historical"
    | "current-unconfirmed";

  evidenceStatus?: EvidenceStatus;
};

export type Diagnosis = {
  name: string;
  status: string;
  date: string;
};

export type Allergy = {
  name: string;
  severity: string;
  reaction: string;
};

export type ClinicalEvent = {
  id: string;
  date: string;

  type:
    | "Seizure"
    | "Medication"
    | "Assessment"
    | "Lab"
    | "Imaging"
    | "Consultation"
    | "Hospitalization"
    | "Therapeutic Drug Monitoring";

  title: string;
  summary: string;

  certainty?: EvidenceStatus;
  source?: string;
  clinician?: string;
};

export type Report = {
  date: string;
  title: string;
  summary: string;
};

export type Demographics = {
  name: string;
  species: string;
  breed: string;
  sex: string;
};

export type Patient = {
  id: string;

  demographics: Demographics;

  condition: string;

  medications: Medication[];
  diagnoses: Diagnosis[];
  allergies: Allergy[];
  clinicalEvents: ClinicalEvent[];
  reports: Report[];
};