"use client";

export default function ReturnToWonderlandButton() {
  const returnToWonderland = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();
      return;
    }

    window.location.href =
      "/patients/HOPE-001/referral";
  };

  return (
    <button
      type="button"
      onClick={returnToWonderland}
      className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
      style={{
        cursor:
          'url("/paw-cursor-pink.png") 16 16, pointer',
      }}
    >
      ← Return to Hope Wonderland
    </button>
  );
}