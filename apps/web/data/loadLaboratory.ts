import fs from "fs";
import path from "path";

export type LaboratoryAnalyte = {
  name: string;
  sourceName?: string;
  result: number | string;
  unit?: string | null;
  referenceRange?: string | null;
  sourceFlag?: "H" | "L" | null;
  sourceInterpretation?: string;
  sourceUnitText?: string;
  notes?: string;
};

export type LaboratoryPanel = {
  name: string;
  analytes: LaboratoryAnalyte[];
};

export type LaboratoryRecord = {
  id: string;
  patientId: string;
  date: string;

  orderedOn?: string;

  facility?: string;

  sourceFile?: string;
  sourceFiles?: string[];
  supportingSourceFile?: string;

  sourceType?: string;
  verification?: string;
  deduplication?: string;

  panels: LaboratoryPanel[];

  notes?: string;
};

export function loadLaboratory(): LaboratoryRecord[] {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "laboratory.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as LaboratoryRecord[];
}