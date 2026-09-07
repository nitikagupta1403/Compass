import { NextResponse } from "next/server";
import { loadPatient } from "@/data/loadPatient";
import { createShareAccess } from "@/lib/shareAccess";
import {
  createShareToken,
  verifyShareToken,
} from "@/lib/shareToken";


export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patientId = body?.patientId;
    const expiryMinutes = body?.expiryMinutes;

    if (
      !patientId ||
      typeof patientId !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Patient ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedExpiryMinutes = [60, 360, 1440];

    if (
      !allowedExpiryMinutes.includes(expiryMinutes)
    ) {
      return NextResponse.json(
        {
          error: "Invalid link duration.",
        },
        {
          status: 400,
        }
      );
    }

    const patient = loadPatient();

    if (patient.id !== patientId) {
      return NextResponse.json(
        {
          error: "Patient not found.",
        },
        {
          status: 404,
        }
      );
    }

    const expiresAt =
      Date.now() + expiryMinutes * 60 * 1000;

    const token = createShareToken(
        patientId,
        expiryMinutes
      );

      const verified =
        verifyShareToken(token);

      if (!verified) {
        return NextResponse.json(
          {
            error: "Unable to verify generated share token.",
          },
          {
            status: 500,
          }
        );
      }

      await createShareAccess({
        shareId: verified.shareId,
        patientId: verified.patientId,
        expiresAt: verified.expiresAt,
      });

      return NextResponse.json({
        token,
        expiresAt: verified.expiresAt,
      });
      

  } catch (error) {
  console.error("CREATE SHARE ERROR:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Unable to create share link.",
    },
    {
      status: 500,
    }
  );
}
}