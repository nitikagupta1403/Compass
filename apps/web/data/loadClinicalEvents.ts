import fs from "fs";
import path from "path";

import type { ClinicalEventRecord } from "@/data/buildReferralData";

export function loadClinicalEvents(): ClinicalEventRecord[] {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "clinical-events.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as ClinicalEventRecord[];
}