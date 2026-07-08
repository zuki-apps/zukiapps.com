import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type ToldyaLegalPage =
  | 'product'
  | 'privacy'
  | 'terms'
  | 'support'
  | 'delete-account'
  | 'child-safety';

type ToldyaLegalNavProps = {
  locale: string;
  current?: ToldyaLegalPage;
};

const NAV_ITEMS: { key: ToldyaLegalPage; path: string; labelKey?: string }[] = [
  { key: 'product', path: '/toldya' },
  { key: 'privacy', path: '/toldya/privacy', labelKey: 'privacy' },
  { key: 'terms', path: '/toldya/terms', labelKey: 'terms' },
  { key: 'support', path: '/toldya/support', labelKey: 'support' },
  { key: 'child-safety', path: '/toldya/child-safety', labelKey: 'childSafety' },
  { key: 'delete-account', path: '/toldya/delete-account', labelKey: 'deleteAccount' },
];

export default async function ToldyaLegalNav({ locale, current }: ToldyaLegalNavProps) {
  const tLegal = await getTranslations({ locale, namespace: 'toldya.legalNav' });
  const tLinks = await getTranslations({ locale, namespace: 'toldya.links' });

  return (
    <div className="mb-8 rounded-xl border border-emerald-200 bg-white/80 p-4 md:p-5">
      <p className="text-sm font-semibold text-gray-900 mb-3">{tLinks('navTitle')}</p>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4" aria-label={tLinks('navTitle')}>
        {NAV_ITEMS.map((item) => {
          const isCurrent = current === item.key;
          const href = `/${locale}${item.path}`;
          const displayLabel =
            item.key === 'product' ? tLinks('productPage') : tLegal(item.labelKey!);

          if (isCurrent) {
            return (
              <span key={item.key} className="text-emerald-700 font-semibold" aria-current="page">
                {displayLabel}
              </span>
            );
          }

          return (
            <Link key={item.key} href={href} className="text-emerald-600 hover:underline">
              {displayLabel}
            </Link>
          );
        })}
      </nav>
      <dl className="grid gap-2 text-xs text-gray-600 sm:grid-cols-2">
        {(
          [
            ['websiteLabel', 'website'],
            ['privacyLabel', 'privacy'],
            ['termsLabel', 'terms'],
            ['supportLabel', 'support'],
            ['deleteAccountLabel', 'deleteAccount'],
            ['childSafetyLabel', 'childSafety'],
          ] as const
        ).map(([labelKey, urlKey]) => (
          <div key={urlKey}>
            <dt className="font-medium text-gray-700">{tLinks(labelKey)}</dt>
            <dd>
              <a href={tLinks(urlKey)} className="text-emerald-600 hover:underline break-all">
                {tLinks(urlKey)}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
