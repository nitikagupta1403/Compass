import { NextResponse } from "next/server";

import { verifyShareToken } from "@/lib/shareToken";
import { revokeShareAccess } from "@/lib/shareAccess";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        {
          error: "Share token is required.",
        },
        {
          status: 400,
        }
      );
    }

    const verified = verifyShareToken(token);

    if (!verified) {
      return NextResponse.json(
        {
          error:
            "Share link is invalid, expired, or already unavailable.",
        },
        {
          status: 400,
        }
      );
    }

    await revokeShareAccess(
      verified.shareId
    );

    return NextResponse.json({
      revoked: true,
    });
  } catch (error) {
    console.error(
      "REVOKE SHARE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to revoke share link.",
      },
      {
        status: 500,
      }
    );
  }
}