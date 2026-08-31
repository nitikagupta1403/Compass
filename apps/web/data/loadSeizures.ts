import fs from "fs";
import path from "path";

import { SeizureEvent } from "@/types/seizure";

export function loadHopeSeizures(): SeizureEvent[] {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "seizures.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as SeizureEvent[];
}