import Link from "next/link";

type Props = {
  previous?: string;
  next?: string;
};

export default function StoryNavigation({
  previous,
  next,
}: Props) {
  return (
    <div className="mt-16 flex items-center justify-between">

      <div>
        {previous && (
          <Link
            href={previous}
            className="text-teal-900 hover:text-teal-700"
          >
            ← Previous
          </Link>
        )}
      </div>

      <div>
        {next && (
          <Link
            href={next}
            className="font-medium text-teal-900 hover:text-teal-700"
          >
            Continue →
          </Link>
        )}
      </div>

    </div>
  );
}