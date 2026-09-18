import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  CONTACTS_TOOLBOX_PILOT,
  CONTACTS_TOOLBOX_PUBLISHED,
  CONTACTS_TOOLBOX_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const CONTACTS_TOOLBOX_INDEXABLE = CONTACTS_TOOLBOX_PUBLISHED || CONTACTS_TOOLBOX_PILOT;
const CONTACTS_TOOLBOX_ROBOTS = CONTACTS_TOOLBOX_INDEXABLE
  ? undefined
  : CONTACTS_TOOLBOX_UNDER_CONSTRUCTION
    ? { index: false, follow: true }
    : { index: false, follow: true };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'contactsToolbox' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/contacts-toolbox',
    t,
    keywords: [
      'Contacts Toolbox',
      'Contacts Organizer',
      'deduplicate contacts',
      'bulk edit contacts',
      'com.zuki.apps.contactstoolbox',
    ],
  });

  return {
    ...meta,
    robots: CONTACTS_TOOLBOX_ROBOTS ?? meta.robots,
  };
}

export default async function ContactsToolboxLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="contacts-toolbox" />
      <AppClientMessages locale={locale} appFolder="contacts-toolbox">
        {children}
      </AppClientMessages>
    </>
  );
}
