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

  const [expiryMinutes, setExpiryMinutes] =
    useState(60);

  const createLink = async () => {
  const response = await fetch("/api/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
      patientId,
      expiryMinutes,
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

      <div className="space-y-2">
        <label
          htmlFor="share-expiry"
          className="block text-sm font-semibold text-slate-700"
        >
          Link duration
        </label>

        <select
          id="share-expiry"
          value={expiryMinutes}
          onChange={(event) =>
            setExpiryMinutes(Number(event.target.value))
          }
          className="block rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          style={{
            cursor:
              'url("/paw-cursor-pink.png") 16 16, pointer',
          }}
          disabled={!!shareUrl && !revoked}
        >
          <option value={60}>1 hour</option>
          <option value={360}>6 hours</option>
          <option value={1440}>24 hours</option>
        </select>
      </div>

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
          <div className="mt-3">
            <span
              className={
                revoked
                  ? "inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                  : "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
              }
            >
              {revoked ? "Revoked" : "Active"}
            </span>
          </div>

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