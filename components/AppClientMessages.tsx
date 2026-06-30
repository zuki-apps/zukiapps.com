import { NextIntlClientProvider } from 'next-intl';
import { loadClientMessagesForApp } from '@/lib/loadAppMessages';

type Props = {
  locale: string;
  appFolder: string;
  children: React.ReactNode;
};

/** Provides shared + app namespace messages to client product pages. */
export default async function AppClientMessages({ locale, appFolder, children }: Props) {
  const messages = await loadClientMessagesForApp(locale, appFolder);

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
