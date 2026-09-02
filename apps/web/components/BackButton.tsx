"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      ← Back to previous view
    </button>
  );
}