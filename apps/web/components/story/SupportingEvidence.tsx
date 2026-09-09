import Link from "next/link";

type Props = {
  evidence: string[];
};

export default function SupportingEvidence({
  evidence,
}: Props) {
  return (
    <div className="mt-8">

      <Link
        href="/patients/HOPE-001/evidence"
        className="text-sm font-medium text-teal-900 hover:text-teal-700"
      >
        View supporting evidence →
      </Link>

      <p className="mt-2 text-xs text-slate-500">
        {evidence.length} supporting record
        {evidence.length > 1 ? "s" : ""}
      </p>

    </div>
  );
}