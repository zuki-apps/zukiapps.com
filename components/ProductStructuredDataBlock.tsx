import { getTranslations } from 'next-intl/server';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import { FaqStructuredData, HowToStructuredData } from '@/components/FaqHowToStructuredData';
import { getProductApp, type ProductAppSlug } from '@/lib/productApps';

type FaqItem = { question: string; answer: string };
type HowToStep = { number?: string; title: string; description: string };

type ProductStructuredDataBlockProps = {
  locale: string;
  slug: ProductAppSlug;
};

export default async function ProductStructuredDataBlock({
  locale,
  slug,
}: ProductStructuredDataBlockProps) {
  const config = getProductApp(slug);
  const t = await getTranslations({ locale, namespace: config.namespace });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const faqItems = (t.raw('faq.items') as FaqItem[] | undefined) ?? [];
  const howToSteps = (t.raw('howToUse.steps') as HowToStep[] | undefined) ?? [];
  const structuredDescription = t.has('hero.structuredDataDescription')
    ? t('hero.structuredDataDescription')
    : t('hero.description');

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: config.appPath },
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appPath={config.appPath}
        appName={t('hero.title')}
        appDescription={structuredDescription}
        operatingSystem="iOS,Android"
        applicationCategory={config.applicationCategory}
        offers={{ price: '0', priceCurrency: 'USD' }}
        aggregateRating={{ ratingValue: 0, ratingCount: 0 }}
        appStoreUrl={t('download.appStoreUrl')}
        googlePlayUrl={t('download.googlePlayUrl')}
      />
      {faqItems.length > 0 && <FaqStructuredData id={config.faqId} items={faqItems} />}
      {howToSteps.length > 0 && (
        <HowToStructuredData
          id={config.howToId}
          name={t('howToUse.title')}
          description={t('hero.description')}
          steps={howToSteps}
        />
      )}
    </>
  );
}
