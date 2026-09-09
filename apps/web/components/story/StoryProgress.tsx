type Props = {
  sections: string[];
  current: number;
};

export default function StoryProgress({
  sections,
  current,
}: Props) {
  return (
    <nav className="sticky top-8">

      <ol className="space-y-6">

        {sections.map((title, index) => (

          <li
            key={title}
            className={
              index === current
                ? "font-semibold text-slate-900"
                : "text-slate-400"
            }
          >
            {title}
          </li>

        ))}

      </ol>

    </nav>
  );
}