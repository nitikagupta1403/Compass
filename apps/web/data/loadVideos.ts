import fs from "fs";
import path from "path";

export type VideoRecord = {
  id: string;
  patientId: string;

  date: string;
  time: string;

  sourceFile: string;
  sourceType: string;
  verification: string;

  durationSeconds: number;

  eventLinkStatus: string;
  linkedSeizureEventId?: string | null;

  clinicalContext?: string;

  observedEvidence?: string;

  seizureOnsetCaptured: boolean;
  seizureClassificationAssigned: boolean;

  specialistReviewRequired: boolean;

  notes?: string;
};

export function loadHopeVideos(): VideoRecord[] {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "patient-data",
    "Hope",
    "videos.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(raw) as VideoRecord[];
}