"use client";

import { useState } from "react";

type Props = {
  patientId: string;
};

export default function ShareLinkPrototype({
  patientId,
}: Props) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const [expiresAt, setExpiresAt] =
    useState<number | null>(null);

  const [revoked, setRevoked] = useState(false);

  const createLink = async () => {
  const response = await fetch("/api/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId,
    }),
  });

  const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error(
        data.error || "Unable to create share link."
      );
    }

    const url =
      `${window.location.origin}` +
      `/patients/${patientId}/shared?share=${encodeURIComponent(
        data.token
      )}`;

    setShareUrl(url);
    setCopied(false);
    setRevoked(false);
    setExpiresAt(data.expiresAt ?? null);

  };

  const copyLink = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };

  const revokeLink = async () => {
  if (!shareUrl) return;

  const token = new URL(shareUrl).searchParams.get(
    "share"
  );

  if (!token) return;

  const response = await fetch(
    "/api/share/revoke",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }
  );

  const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Unable to revoke share link."
      );
    }

    setRevoked(true);
  };

  return (
    <div className="mt-7 space-y-4">
      <button
        type="button"
        onClick={createLink}
        className="inline-flex rounded-full bg-teal-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        style={{
          cursor:
            'url("/paw-cursor-pink.png") 16 16, pointer',
        }}
      >
        Create read-only link →
      </button>

      {shareUrl && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Local prototype link
          </p>

          <p className="mt-2 break-all text-sm text-slate-700">
            {shareUrl}
          </p>

          {expiresAt && (
            <p className="mt-3 text-xs text-slate-500">
              Expires at{" "}
              {new Date(expiresAt).toLocaleString()}
            </p>
          )}

          <button
            type="button"
            onClick={copyLink}
            className="mt-4 rounded-full border border-teal-800 px-4 py-2 text-sm font-semibold text-teal-900 transition hover:bg-white"
            style={{
              cursor:
                'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>

          <button
            type="button"
            onClick={revokeLink}
            disabled={revoked}
            className="ml-3 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              cursor: revoked
                ? "not-allowed"
                : 'url("/paw-cursor-pink.png") 16 16, pointer',
            }}
          >
            {revoked ? "Revoked ✓" : "Revoke link"}
          </button>
        </div>
      )}
    </div>
  );
}