import { NextResponse } from "next/server";
import { loadPatient } from "@/data/loadPatient";
import { createShareToken } from "@/lib/shareToken";

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

    return NextResponse.json({
      token,
      expiresAt,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unable to create share link.",
      },
      {
        status: 500,
      }
    );
  }
}