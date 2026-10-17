import Image from 'next/image';

type Props = {
  heading: string;
  body: string;
  quote: string;
  attribution: string;
  href: string;
  linkLabel: string;
  logoAlt: string;
  className?: string;
};

/** Factual third-party UpdateStar award (not App Store / Play AggregateRating). */
export default function UpdateStarAward({
  heading,
  body,
  quote,
  attribution,
  href,
  linkLabel,
  logoAlt,
  className = '',
}: Props) {
  return (
    <aside
      className={`max-w-xl mx-auto rounded-2xl border border-amber-500/25 bg-amber-950/20 px-5 py-5 text-center ${className}`}
      aria-label={heading}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/80 mb-3">{heading}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col items-center gap-3 group"
      >
        <Image
          src="/images/updatestar-rating-5stars.png"
          alt={logoAlt}
          width={118}
          height={96}
          className="mx-auto"
        />
        <span className="text-sm font-semibold text-amber-300 group-hover:text-amber-200 underline underline-offset-2">
          {linkLabel}
        </span>
      </a>
      <p className="mt-3 text-sm text-indigo-100/85 leading-relaxed">{body}</p>
      <blockquote className="mt-4 text-sm text-slate-200 italic leading-relaxed">
        “{quote}”
      </blockquote>
      <p className="mt-2 text-xs text-slate-400">{attribution}</p>
    </aside>
  );
}
