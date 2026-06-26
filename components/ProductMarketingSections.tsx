'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { asArray, hasMessage, safeRaw } from '@/lib/safeTranslations';
import ScreenshotLightbox from '@/components/ScreenshotLightbox';
import OtherZukiApps from '@/components/OtherZukiApps';

type ScreenshotItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category?: string;
};

type AccentClasses = {
  navHover: string;
  border: string;
  borderHover: string;
  heading: string;
  stepBg: string;
  stepBorder: string;
  stepNumber: string;
  faqBorder: string;
  faqToggle: string;
  cta: string;
  ctaHover: string;
};

const ACCENT: Record<string, AccentClasses> = {
  purple: {
    navHover: 'hover:text-purple-300',
    border: 'border-purple-600/30',
    borderHover: 'hover:border-purple-500/50',
    heading: 'text-purple-300',
    stepBg: 'bg-purple-600/30',
    stepBorder: 'border-purple-500/50',
    stepNumber: 'text-purple-400',
    faqBorder: 'border-purple-600/30',
    faqToggle: 'text-purple-400',
    cta: 'bg-purple-600',
    ctaHover: 'hover:bg-purple-500',
  },
  violet: {
    navHover: 'hover:text-violet-300',
    border: 'border-violet-600/30',
    borderHover: 'hover:border-violet-500/50',
    heading: 'text-violet-300',
    stepBg: 'bg-violet-600/30',
    stepBorder: 'border-violet-500/50',
    stepNumber: 'text-violet-400',
    faqBorder: 'border-violet-600/30',
    faqToggle: 'text-violet-400',
    cta: 'bg-violet-600',
    ctaHover: 'hover:bg-violet-500',
  },
  cyan: {
    navHover: 'hover:text-cyan-300',
    border: 'border-cyan-600/30',
    borderHover: 'hover:border-cyan-500/50',
    heading: 'text-cyan-300',
    stepBg: 'bg-cyan-600/30',
    stepBorder: 'border-cyan-500/50',
    stepNumber: 'text-cyan-400',
    faqBorder: 'border-cyan-600/30',
    faqToggle: 'text-cyan-400',
    cta: 'bg-cyan-600',
    ctaHover: 'hover:bg-cyan-500',
  },
  emerald: {
    navHover: 'hover:text-emerald-300',
    border: 'border-emerald-600/30',
    borderHover: 'hover:border-emerald-500/50',
    heading: 'text-emerald-300',
    stepBg: 'bg-emerald-600/30',
    stepBorder: 'border-emerald-500/50',
    stepNumber: 'text-emerald-400',
    faqBorder: 'border-emerald-600/30',
    faqToggle: 'text-emerald-400',
    cta: 'bg-emerald-600',
    ctaHover: 'hover:bg-emerald-500',
  },
  green: {
    navHover: 'hover:text-green-300',
    border: 'border-green-600/30',
    borderHover: 'hover:border-green-500/50',
    heading: 'text-green-300',
    stepBg: 'bg-green-600/30',
    stepBorder: 'border-green-500/50',
    stepNumber: 'text-green-400',
    faqBorder: 'border-green-600/30',
    faqToggle: 'text-green-400',
    cta: 'bg-green-600',
    ctaHover: 'hover:bg-green-500',
  },
  orange: {
    navHover: 'hover:text-orange-300',
    border: 'border-orange-600/30',
    borderHover: 'hover:border-orange-500/50',
    heading: 'text-orange-300',
    stepBg: 'bg-orange-600/30',
    stepBorder: 'border-orange-500/50',
    stepNumber: 'text-orange-400',
    faqBorder: 'border-orange-600/30',
    faqToggle: 'text-orange-400',
    cta: 'bg-orange-600',
    ctaHover: 'hover:bg-orange-500',
  },
  blue: {
    navHover: 'hover:text-blue-300',
    border: 'border-blue-600/30',
    borderHover: 'hover:border-blue-500/50',
    heading: 'text-blue-300',
    stepBg: 'bg-blue-600/30',
    stepBorder: 'border-blue-500/50',
    stepNumber: 'text-blue-400',
    faqBorder: 'border-blue-600/30',
    faqToggle: 'text-blue-400',
    cta: 'bg-blue-600',
    ctaHover: 'hover:bg-blue-500',
  },
  rose: {
    navHover: 'hover:text-rose-300',
    border: 'border-rose-600/30',
    borderHover: 'hover:border-rose-500/50',
    heading: 'text-rose-300',
    stepBg: 'bg-rose-600/30',
    stepBorder: 'border-rose-500/50',
    stepNumber: 'text-rose-400',
    faqBorder: 'border-rose-600/30',
    faqToggle: 'text-rose-400',
    cta: 'bg-rose-600',
    ctaHover: 'hover:bg-rose-500',
  },
  teal: {
    navHover: 'hover:text-teal-300',
    border: 'border-teal-600/30',
    borderHover: 'hover:border-teal-500/50',
    heading: 'text-teal-300',
    stepBg: 'bg-teal-600/30',
    stepBorder: 'border-teal-500/50',
    stepNumber: 'text-teal-400',
    faqBorder: 'border-teal-600/30',
    faqToggle: 'text-teal-400',
    cta: 'bg-teal-600',
    ctaHover: 'hover:bg-teal-500',
  },
  amber: {
    navHover: 'hover:text-amber-300',
    border: 'border-amber-600/30',
    borderHover: 'hover:border-amber-500/50',
    heading: 'text-amber-300',
    stepBg: 'bg-amber-600/30',
    stepBorder: 'border-amber-500/50',
    stepNumber: 'text-amber-400',
    faqBorder: 'border-amber-600/30',
    faqToggle: 'text-amber-400',
    cta: 'bg-amber-600',
    ctaHover: 'hover:bg-amber-500',
  },
  sky: {
    navHover: 'hover:text-sky-300',
    border: 'border-sky-600/30',
    borderHover: 'hover:border-sky-500/50',
    heading: 'text-sky-300',
    stepBg: 'bg-sky-600/30',
    stepBorder: 'border-sky-500/50',
    stepNumber: 'text-sky-400',
    faqBorder: 'border-sky-600/30',
    faqToggle: 'text-sky-400',
    cta: 'bg-sky-600',
    ctaHover: 'hover:bg-sky-500',
  },
};

type Props = {
  namespace: string;
  slug: string;
  accent?: string;
  hasSupportPage?: boolean;
};

export function ProductPageNav({ namespace, accent = 'purple' }: { namespace: string; accent?: string }) {
  const t = useTranslations(namespace);
  const a = ACCENT[accent] ?? ACCENT.purple;

  const links: Array<{ href: string; labelKey: string; requiredKey: string }> = [
    { href: '#features', labelKey: 'pageNav.features', requiredKey: 'features.title' },
    { href: '#screenshots', labelKey: 'pageNav.screenshots', requiredKey: 'screenshots.title' },
    { href: '#how-to', labelKey: 'pageNav.howTo', requiredKey: 'howToUse.title' },
    { href: '#faq', labelKey: 'pageNav.faq', requiredKey: 'faq.title' },
    { href: '#zuli-monsters', labelKey: 'pageNav.zuliMonsters', requiredKey: 'zuliMonsters.title' },
    { href: '#premium', labelKey: 'pageNav.premium', requiredKey: 'premium.title' },
    { href: '#manual', labelKey: 'pageNav.manual', requiredKey: 'manual.title' },
    { href: '#tips', labelKey: 'pageNav.tips', requiredKey: 'tips.title' },
    { href: '#download', labelKey: 'pageNav.download', requiredKey: 'download.title' },
  ];

  const visible = links.filter(
    ({ labelKey, requiredKey }) => hasMessage(t, labelKey) && hasMessage(t, requiredKey)
  );

  if (visible.length === 0) return null;

  return (
    <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-8" aria-label="Page sections">
      {visible.map((link, i) => (
        <span key={link.href} className="inline-flex items-center gap-4">
          {i > 0 && <span className="text-gray-600" aria-hidden>|</span>}
          <a href={link.href} className={`${a.navHover} transition-colors`}>
            {t(link.labelKey)}
          </a>
        </span>
      ))}
    </nav>
  );
}

export default function ProductMarketingSections({ namespace, slug, accent = 'purple', hasSupportPage }: Props) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const a = ACCENT[accent] ?? ACCENT.purple;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshotItems = asArray<ScreenshotItem>(safeRaw(t, 'screenshots.items'));
  const faqItems = asArray<{ question: string; answer: string }>(safeRaw(t, 'faq.items'));
  const howToSteps = asArray<{ number: string; title: string; description: string }>(safeRaw(t, 'howToUse.steps'));
  const manualSections = asArray<{ title: string; steps: string[] }>(safeRaw(t, 'manual.sections'));
  const tipItems = asArray<{ title: string; description: string }>(safeRaw(t, 'tips.items'));

  const showManual = hasMessage(t, 'manual.title') && manualSections.length > 0;
  const showTips = hasMessage(t, 'tips.title') && tipItems.length > 0;
  const showScreenshots = hasMessage(t, 'screenshots.title') && screenshotItems.length > 0;
  const showHowTo = hasMessage(t, 'howToUse.title') && howToSteps.length > 0;
  const showFaq = hasMessage(t, 'faq.title') && faqItems.length > 0;

  const featureShots = screenshotItems.filter((item) => !item.category || item.category === 'features');
  const otherShots = screenshotItems.filter((item) => item.category && item.category !== 'features');
  const howToCols =
    howToSteps.length >= 5 ? 'lg:grid-cols-5' : howToSteps.length === 4 ? 'lg:grid-cols-4' : howToSteps.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2';

  const lightboxImages = screenshotItems.map((item) => ({
    src: item.image,
    alt: item.alt,
    title: item.title,
    description: item.description,
  }));

  const renderScreenshotFigure = (item: ScreenshotItem, globalIndex: number) => (
    <figure
      key={item.id}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-2 ${a.border} ${a.borderHover} transition-all`}
    >
      <button
        type="button"
        onClick={() => setLightboxIndex(globalIndex)}
        className="w-full max-w-[220px] mx-auto block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-t-xl"
        aria-label={`View larger: ${item.title}`}
      >
        <Image src={item.image} alt={item.alt} width={640} height={1280} unoptimized sizes="220px" className="w-full h-auto block" />
      </button>
      <figcaption className="p-4">
        <h4 className="font-bold text-white mb-2">{item.title}</h4>
        <p className="text-sm text-gray-400">{item.description}</p>
      </figcaption>
    </figure>
  );

  return (
    <>
      <ScreenshotLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
      {showScreenshots && (
        <section className="py-12 px-4 relative z-10" id="screenshots">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('screenshots.title')}</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t('screenshots.subtitle')}</p>
            {featureShots.length > 0 && (
              <>
                <h3 className={`text-2xl font-bold ${a.heading} mb-6`}>{t('screenshots.featuresTitle')}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-start">
                  {featureShots.map((item, i) => renderScreenshotFigure(item, i))}
                </div>
              </>
            )}
            {otherShots.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {otherShots.map((item, i) => renderScreenshotFigure(item, featureShots.length + i))}
              </div>
            )}
          </div>
        </section>
      )}

      {showHowTo && (
        <section className="py-12 px-4 relative z-10" id="how-to">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('howToUse.title')}</h2>
            {hasMessage(t, 'howToUse.subtitle') && (
              <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t('howToUse.subtitle')}</p>
            )}
            {!hasMessage(t, 'howToUse.subtitle') && <div className="mb-8" />}
            <div className={`grid gap-6 md:grid-cols-2 ${howToCols}`}>
              {howToSteps.map((step, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg ${a.borderHover} border-2 ${a.border} transition-all text-center`}
                >
                  <div className={`w-16 h-16 rounded-full ${a.stepBg} border-2 ${a.stepBorder} flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl font-bold ${a.stepNumber}`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showManual && (
        <section className="py-12 px-4 relative z-10" id="manual">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('manual.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('manual.subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {manualSections.map((section, i) => (
                <div key={i} className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 ${a.border}`}>
                  <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                    {section.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showTips && (
        <section className="py-12 px-4 relative z-10" id="tips">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('tips.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('tips.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipItems.map((tip, i) => (
                <div key={i} className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 ${a.border} ${a.borderHover} transition-all`}>
                  <h3 className={`text-lg font-bold ${a.heading} mb-2`}>{tip.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showFaq && (
        <section className="py-12 px-4 relative z-10" id="faq">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('faq.title')}</h2>
            <p className="text-center text-gray-400 mb-8">{t('faq.subtitle')}</p>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border ${a.faqBorder} group`}>
                  <summary className="cursor-pointer p-5 font-semibold text-white list-none flex justify-between items-center">
                    {item.question}
                    <span className={`${a.faqToggle} ml-2 group-open:rotate-45 transition-transform`}>+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
            {hasSupportPage && (
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/${slug}/support`}
                  className={`inline-flex items-center gap-2 px-6 py-3 ${a.cta} ${a.ctaHover} text-white font-semibold rounded-lg transition-colors`}
                >
                  {t('faq.viewAllSupport')}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
      <OtherZukiApps currentAppId={slug} />
    </>
  );
}
