import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import AppIconFrame from '@/components/AppIconFrame';
import { HOME_APP_ICON_WEBP } from '@/lib/homeAppIcons';
import { FEATURED_APP_IDS } from '@/lib/homeApps';

const SUBTITLE_KEY: Record<(typeof FEATURED_APP_IDS)[number], string> = {
  'hush-gallery': 'hushGallery.subtitle',
  zulist: 'zulist.subtitle',
  'whistle-camera': 'whistleCamera.subtitle',
  collagio: 'collagio.subtitle',
};

const TITLE_KEY: Record<(typeof FEATURED_APP_IDS)[number], string> = {
  'hush-gallery': 'hushGallery.title',
  zulist: 'zulist.title',
  'whistle-camera': 'whistleCamera.title',
  collagio: 'collagio.title',
};

export default async function FeaturedApps({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="mb-10 max-w-4xl mx-auto" aria-labelledby="featured-apps-heading">
      <h2 id="featured-apps-heading" className="text-2xl md:text-3xl font-black text-white text-center mb-2">
        {t('featured.title')}
      </h2>
      <p className="text-center text-gray-400 mb-6 text-sm md:text-base">{t('featured.subtitle')}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {FEATURED_APP_IDS.map((id) => (
          <Link
            key={id}
            href={`/${locale}/${id}`}
            className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-amber-400/35 bg-gradient-to-br from-indigo-950/90 to-violet-950/75 hover:border-amber-300/55 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
          >
            <AppIconFrame
              src={HOME_APP_ICON_WEBP[id]}
              alt={t(TITLE_KEY[id])}
              sizes="72px"
              edgeToEdge={id === 'hush-gallery' || id === 'whistle-camera' || id === 'collagio'}
              boxClassName="w-16 h-16 shrink-0"
              frameClassName="rounded-[22%] overflow-hidden ring-2 ring-amber-400/30 group-hover:ring-amber-300/50"
            />
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300/90 mb-0.5">
                {t('featured.badge')}
              </p>
              <h3 className="font-bold text-white group-hover:text-amber-100 transition-colors line-clamp-2">
                {t(TITLE_KEY[id])}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">{t(SUBTITLE_KEY[id])}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
