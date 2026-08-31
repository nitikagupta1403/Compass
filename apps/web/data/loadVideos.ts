import fs from "fs";
import path from "path";

export type VideoRecord = {
  id: string;
  patientId: string;
  capturedAt: string;
  fileName: string;
  eventLinkStatus: string;
  clinicalPhase: string;
  source: string;
  verification: string;
  observations?: string[];
  interpretation?: string;
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