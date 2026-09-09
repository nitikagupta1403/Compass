import Link from "next/link";

import { hopeBook } from "@/data/book";

type Props = {
  current: string;
};

export default function BookContents({
  current,
}: Props) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6">

      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
        Contents
      </p>

      <ol className="mt-6 space-y-3">

        {hopeBook.map((chapter, index) => {

          const active = chapter.id === current;

          return (
            <li key={chapter.id}>

              <Link
                href={chapter.route}
                className={`block rounded-lg px-3 py-2 transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs uppercase tracking-[0.2em] opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mt-1 font-medium">
                  {chapter.title}
                </div>

              </Link>

            </li>
          );
        })}

      </ol>

    </aside>
  );
}