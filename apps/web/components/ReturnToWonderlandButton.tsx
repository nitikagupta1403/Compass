"use client";

type Props = {
  patientId: string;
  shareToken?: string;
  returnLevel?: string;
};

export default function ReturnToWonderlandButton({
  patientId,
  shareToken,
  returnLevel,
}: Props) {
  const returnToWonderland = () => {
    const levelQuery = returnLevel
      ? `&level=${encodeURIComponent(returnLevel)}`
      : "";

    if (shareToken) {
      window.location.href =
        `/patients/${patientId}/shared?share=${encodeURIComponent(
          shareToken
        )}${levelQuery}`;

      return;
    }

    if (window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();
      return;
    }

    window.location.href =
      `/patients/${patientId}/referral${
        returnLevel
          ? `?level=${encodeURIComponent(returnLevel)}`
          : ""
      }`;
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