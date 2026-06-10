import { getTranslations } from 'next-intl/server';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import { FaqStructuredData, HowToStructuredData } from '@/components/FaqHowToStructuredData';

type FaqItem = { question: string; answer: string };
type HowToStep = { number?: string; title: string; description: string };

type ProductStructuredDataBlockProps = {
  locale: string;
  namespace: 'hushGallery' | 'whistleCamera';
  appPath: '/hush-gallery' | '/whistle-camera';
  applicationCategory: string;
  faqId: string;
  howToId: string;
};

export default async function ProductStructuredDataBlock({
  locale,
  namespace,
  appPath,
  applicationCategory,
  faqId,
  howToId,
}: ProductStructuredDataBlockProps) {
  const t = await getTranslations({ locale, namespace });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const faqItems = (t.raw('faq.items') as FaqItem[] | undefined) ?? [];
  const howToSteps = (t.raw('howToUse.steps') as HowToStep[] | undefined) ?? [];

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: appPath },
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appPath={appPath}
        appName={t('hero.title')}
        appDescription={t('hero.structuredDataDescription')}
        operatingSystem="iOS,Android"
        applicationCategory={applicationCategory}
        offers={{ price: '0', priceCurrency: 'USD' }}
        aggregateRating={{ ratingValue: 0, ratingCount: 0 }}
        appStoreUrl={t('download.appStoreUrl')}
        googlePlayUrl={t('download.googlePlayUrl')}
      />
      {faqItems.length > 0 && <FaqStructuredData id={faqId} items={faqItems} />}
      {howToSteps.length > 0 && (
        <HowToStructuredData
          id={howToId}
          name={t('howToUse.title')}
          description={t('hero.description')}
          steps={howToSteps}
        />
      )}
    </>
  );
}
