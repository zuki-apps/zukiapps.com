/** Sync `<html lang>` / `dir` from the `[locale]` segment without forcing dynamic root layout. */
export default function LocaleHtmlSync({
  locale,
  dir,
}: {
  locale: string;
  dir: 'ltr' | 'rtl';
}) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)};})();`,
      }}
    />
  );
}
