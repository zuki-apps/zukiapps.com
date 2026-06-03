import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { CircleHelp } from 'lucide-react';
import { buildCanonical } from '@/lib/hreflang';

type FaqItem = { question: string; answer: string };

export default async function HomeFaq({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const pageUrl = buildCanonical(locale, '');
  const rtl = locale === 'he' || locale === 'ar';

  const items = t.raw('faq.items') as FaqItem[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="zuki-home-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="card-twilight mt-12" aria-labelledby="home-faq-heading">
        <div
          className={`flex items-center gap-3 mb-6 ${rtl ? 'flex-row-reverse' : 'flex-row'} justify-center`}
        >
          <CircleHelp className="w-10 h-10 text-sky-400 shrink-0" aria-hidden="true" />
          <h2 id="home-faq-heading" className="text-3xl font-black text-white text-center">
            {t('faq.title')}
          </h2>
        </div>
        <div className={`space-y-3 ${rtl ? 'text-right' : 'text-left'}`}>
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-600/50 bg-slate-900/45 px-4 py-3 open:bg-slate-900/65 transition-colors"
            >
              <summary
                className={`cursor-pointer font-semibold text-gray-100 list-none flex items-start gap-2 [&::-webkit-details-marker]:hidden ${rtl ? 'flex-row-reverse' : ''}`}
              >
                <span
                  className="text-sky-400/90 shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                  aria-hidden
                >
                  ▸
                </span>
                <span>{item.question}</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-700/60">
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
