import Link from 'next/link';

type LegalSectionsProps = {
  sections: readonly string[];
  /** Section keys that include a string[] at `.items` */
  listSectionKeys?: readonly string[];
  /** Section keys that include `.content2` paragraph after `.content` */
  withContent2?: readonly string[];
  t: (key: string) => string;
  tRaw: (key: string) => unknown;
  rtl: boolean;
  headingClassName?: string;
  contactSectionKey?: string;
  contactExtraLinks?: { href: string; label: string }[];
  emailLabel: string;
  addressLabel: string;
};

export default function LegalSections({
  sections,
  listSectionKeys = [],
  withContent2 = [],
  t,
  tRaw,
  rtl,
  headingClassName = 'text-emerald-600',
  contactSectionKey,
  contactExtraLinks = [],
  emailLabel,
  addressLabel,
}: LegalSectionsProps) {
  const listKeys = new Set(listSectionKeys);
  const content2Keys = new Set(withContent2);

  const optionalMessage = (key: string): string | null => {
    try {
      const value = t(key);
      return value || null;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-8">
      {sections.map((key) => {
        const content2 = content2Keys.has(key) ? optionalMessage(`${key}.content2`) : null;
        return (
        <section key={key}>
          <h3 className={`text-2xl font-bold mb-4 ${headingClassName}`}>{t(`${key}.title`)}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t(`${key}.content`)}</p>
          {content2 && (
            <p className="text-gray-700 leading-relaxed mb-4">{content2}</p>
          )}
          {listKeys.has(key) && Array.isArray(tRaw(`${key}.items`)) && (
            <ul className={`list-disc ${rtl ? 'mr-6' : 'ml-6'} space-y-2`}>
              {(tRaw(`${key}.items`) as string[]).map((item, i) => (
                <li key={i} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      );
      })}

      {contactSectionKey && (
        <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-emerald-600">
          <h3 className={`text-2xl font-bold mb-4 ${headingClassName}`}>{t(`${contactSectionKey}.title`)}</h3>
          <p className="text-gray-700 mb-4">{t(`${contactSectionKey}.content`)}</p>
          {optionalMessage(`${contactSectionKey}.email`) && (
            <p className="text-gray-700 mb-2">
              <strong>{emailLabel}:</strong>{' '}
              <a
                href={`mailto:${optionalMessage(`${contactSectionKey}.email`)}`}
                className="text-emerald-600 hover:underline"
              >
                {optionalMessage(`${contactSectionKey}.email`)}
              </a>
            </p>
          )}
          {optionalMessage(`${contactSectionKey}.address`) && (
            <p className="text-gray-700 mb-4">
              <strong>{addressLabel}:</strong> {optionalMessage(`${contactSectionKey}.address`)}
            </p>
          )}
          {contactExtraLinks.length > 0 && (
            <p className="text-gray-700 text-sm flex flex-wrap gap-x-4 gap-y-2">
              {contactExtraLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-emerald-600 hover:underline">
                  {link.label}
                </Link>
              ))}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
