import { NextResponse } from "next/server";
import { revokeShareToken } from "@/lib/shareToken";

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

    const revoked = revokeShareToken(token);

    if (!revoked) {
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

    return NextResponse.json({
      revoked: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to revoke share link.",
      },
      {
        status: 500,
      }
    );
  }
}