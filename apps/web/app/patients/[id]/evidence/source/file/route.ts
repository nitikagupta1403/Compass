import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

import { verifyActiveShareToken } from "@/lib/shareAccess";

import {
  hopeEvidenceIndex,
  type EvidenceIndexItem,
} from "@/data/evidenceIndex";

export const runtime = "nodejs";

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
    const verifiedShare = share
      ? await verifyActiveShareToken(share)
      : null;

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

  const root =
    process.env.HOPE_MEDICAL_RECORD_ROOT;

  if (!root) {
    return new Response(
      "Source storage not configured",
      {
        status: 500,
      }
    );
  }

  /*
   * Gate 3:
   * Search only known clinical-source folders.
   */
  const sourceFolders = [
    root,
    path.join(root, "01_Prescriptions"),
    path.join(root, "02_Lab_Reports"),
    path.join(root, "05_Videos"),
  ];

  let filePath: string | null = null;

  for (const folder of sourceFolders) {
    const resolvedFolder =
      path.resolve(folder);

    const candidate =
      path.resolve(
        resolvedFolder,
        safeFileName
      );

    /*
     * Defense in depth:
     * candidate must remain inside
     * the allowed folder.
     */
    if (
      candidate !== resolvedFolder &&
      !candidate.startsWith(
        `${resolvedFolder}${path.sep}`
      )
    ) {
      continue;
    }

    try {
      await readFile(candidate);
      filePath = candidate;
      break;
    } catch {
      // Try the next allowed folder.
    }
  }

  if (!filePath) {
    return new Response(
      "Source document not found",
      {
        status: 404,
      }
    );
  }

  try {
    const file =
      await readFile(filePath);

    const contentType =
      getContentType(safeFileName);

    return new Response(file, {
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
  } catch {
    return new Response(
      "Source document not found",
      {
        status: 404,
      }
    );
  }
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