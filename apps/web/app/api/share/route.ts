import { NextResponse } from "next/server";
import { loadPatient } from "@/data/loadPatient";
import { createShareToken } from "@/lib/shareToken";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patientId = body?.patientId;

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
      Date.now() + 60 * 60 * 1000;

    const token = createShareToken(
      patientId,
      60
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