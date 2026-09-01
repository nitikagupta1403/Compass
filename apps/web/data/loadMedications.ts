import fs from "fs";
import path from "path";

export type MedicationRecord = {
  id: string;
  patientId: string;
  prescribedOn: string;
  drug: string;
  activeIngredient?: string | null;
  strength?: string;
  form?: string;
  dose?: {
    amount: number | null;
    unit: string;
  };
  schedule?: string;
  duration?: string;
  usageType?: string;
  status?: string;
  sourceFile?: string;
  verification?: string;
  notes?: string;
  actualUseEndDate?: string;
};

export function loadMedications(): MedicationRecord[] {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "medications.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as MedicationRecord[];
}