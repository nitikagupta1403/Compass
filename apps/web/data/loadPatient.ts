import fs from "fs";
import path from "path";

export type PatientRecord = {
  id: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  dateOfBirth: string;
  weightKg?: number | null;
  owner?: string;
  status?: string;
  clinicalProblem: string;

  primaryDiagnosis: string[];
  diagnosisStatus?: string;

  dateOfBirthVerification?: string;

  sourceDiscrepancies?: {
    field: string;
    canonicalValue: string;
    conflictingSourceValue: string;
    source: string;
    resolution: string;
  }[];
};

export function loadPatient(): PatientRecord {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "patient.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as PatientRecord;
}