import path from "path";
import { NextRequest } from "next/server";

import { verifyActiveShareToken } from "@/lib/shareAccess";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

import {
  hopeEvidenceIndex,
  type EvidenceIndexItem,
} from "@/data/evidenceIndex";

export const runtime = "nodejs";

const STORAGE_BUCKET =
  "hope-medical-record";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const source =
    request.nextUrl.searchParams.get("source");

  const share =
    request.nextUrl.searchParams.get("share");

  if (!source) {
    return new Response("Missing source", {
      status: 400,
    });
  }

  if (id !== "HOPE-001") {
    return new Response("Patient not found", {
      status: 404,
    });
  }

  /*
   * Shared-access gate:
   * if a share token is supplied, it must be valid,
   * unexpired, unrevoked, and bound to this patient.
   */
  if (share) {
    const verifiedShare =
      await verifyActiveShareToken(share);

    if (
      !verifiedShare ||
      verifiedShare.patientId !== id
    ) {
      return new Response(
        "Shared link unavailable",
        {
          status: 403,
        }
      );
    }
  }

  /*
   * Gate 1:
   * Source must already be registered
   * in Compass provenance.
   */
  const isIndexed = hopeEvidenceIndex.some(
    (item) =>
      evidenceContainsSource(item, source)
  );

  if (!isIndexed) {
    return new Response(
      "Source is not registered in the Compass evidence index",
      {
        status: 404,
      }
    );
  }

  /*
   * Gate 2:
   * Accept filenames only, never paths.
   */
  const safeFileName = path.basename(source);

  if (safeFileName !== source) {
    return new Response("Invalid source", {
      status: 400,
    });
  }

  /*
   * For the first storage migration test,
   * Jun_2026.pdf lives in:
   *
   * hope-medical-record/
   * HOPE-001/
   * prescriptions/
   * Jun_2026.pdf
   */
  const storageFolders = [
  "root",
  "prescriptions",
  "labs",
  "videos",
];

let sourceData: Blob | null = null;

for (const folder of storageFolders) {
  const storagePath =
    `HOPE-001/${folder}/${safeFileName}`;

  const { data, error } =
    await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .download(storagePath);

  if (!error && data) {
    sourceData = data;
    break;
  }
}

if (!sourceData) {
  return new Response(
    "Source document not found",
    {
      status: 404,
    }
  );
}

  const fileBuffer =
    Buffer.from(
        await sourceData.arrayBuffer()
      );

  const contentType =
    getContentType(safeFileName);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": contentType,

      "Content-Disposition":
        `inline; filename*=UTF-8''${encodeURIComponent(
          safeFileName
        )}`,

      "Cache-Control":
        "private, no-store, max-age=0",

      "X-Content-Type-Options":
        "nosniff",
    },
  });
}

function evidenceContainsSource(
  item: EvidenceIndexItem,
  source: string
) {
  return (
    item.sourceFile === source ||
    item.sourceFiles?.includes(source) === true
  );
}

function getContentType(
  filename: string
) {
  const extension = path
    .extname(filename)
    .toLowerCase();

  if (extension === ".pdf") {
    return "application/pdf";
  }

  if (
    extension === ".jpeg" ||
    extension === ".jpg"
  ) {
    return "image/jpeg";
  }

  if (extension === ".png") {
    return "image/png";
  }

  if (extension === ".webp") {
    return "image/webp";
  }

  if (extension === ".mp4") {
    return "video/mp4";
  }

  if (extension === ".mov") {
    return "video/quicktime";
  }

  return "application/octet-stream";
}