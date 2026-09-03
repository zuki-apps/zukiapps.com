type PressItem = { name: string; href: string };

export default function PressMentions({
  heading,
  disclaimer,
  items,
  className = '',
}: {
  heading: string;
  disclaimer?: string;
  items: readonly PressItem[];
  className?: string;
}) {
  return (
    <aside className={`max-w-3xl mx-auto ${className}`} aria-label={heading}>
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 mb-3">{heading}</p>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300/90 hover:text-amber-200 underline underline-offset-2"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      {disclaimer ? <p className="mt-3 text-xs text-slate-400 leading-relaxed">{disclaimer}</p> : null}
    </aside>
  );
}