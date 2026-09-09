import Link from "next/link";

import { hopeBook } from "@/data/book";

type Props = {
  current: string;
};

export default function BookNavigation({
  current,
}: Props) {
  const currentIndex = hopeBook.findIndex(
    (chapter) => chapter.id === current
  );

  if (currentIndex === -1) {
    return null;
  }

  const previous =
    currentIndex > 0
      ? hopeBook[currentIndex - 1]
      : null;

  const next =
    currentIndex < hopeBook.length - 1
      ? hopeBook[currentIndex + 1]
      : null;

  return (
    <nav
      className="mb-12 flex items-center justify-between border-b border-slate-200 pb-6"
      aria-label="Book navigation"
    >
      <div className="min-w-0">

        {previous ? (
          <Link
            href={previous.route}
            className="group block"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Previous
            </p>

            <p className="mt-1 text-sm text-slate-700 group-hover:text-slate-900">
              {previous.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

      </div>

      <div className="text-center">

        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Clinical Case Book
        </p>

        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          {hopeBook[currentIndex].title}
        </h2>

      </div>

      <div className="min-w-0 text-right">

        {next ? (
          <Link
            href={next.route}
            className="group block"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Next
            </p>

            <p className="mt-1 text-sm text-slate-700 group-hover:text-slate-900">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

      </div>

    </nav>
  );
}