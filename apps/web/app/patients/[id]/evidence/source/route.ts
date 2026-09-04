import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const source = request.nextUrl.searchParams.get(
    "source"
  );

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

  const safeFileName = path.basename(source);

  if (safeFileName !== source) {
    return new Response("Invalid source", {
      status: 400,
    });
  }

    const sourceFolders = [
        "/Users/nitikagupta/Desktop/Hope/Hope_Medical_Record",
        "/Users/nitikagupta/Desktop/Hope/Hope_Medical_Record/01_Prescriptions",
        "/Users/nitikagupta/Desktop/Hope/Hope_Medical_Record/02_Lab_Reports",
        "/Users/nitikagupta/Desktop/Hope/Hope_Medical_Record/05_Videos",
        ];

        let filePath: string | null = null;

        for (const folder of sourceFolders) {
            const candidate = path.join(
                folder,
                safeFileName
            );

        try {
            await readFile(candidate);
            filePath = candidate;
            break;
        } catch {
            // Try the next allowed location.
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
            const file = await readFile(filePath);

    const extension = path
      .extname(safeFileName)
      .toLowerCase();

    const contentType =
      extension === ".pdf"
        ? "application/pdf"
        : extension === ".jpeg" ||
          extension === ".jpg"
        ? "image/jpeg"
        : extension === ".png"
        ? "image/png"
        : extension === ".mp4"
        ? "video/mp4"
        : "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${safeFileName}"`,
        "Cache-Control": "private, no-store",
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