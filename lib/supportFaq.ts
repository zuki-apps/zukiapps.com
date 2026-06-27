/** Collect support FAQ entries keyed as faq.q1.question / faq.q1.answer … */
export type SupportFaqItem = { question: string; answer: string };

type NumberedFaqTranslator = {
  has: (key: string) => boolean;
  (key: string): string;
};

export function collectNumberedSupportFaq(
  t: NumberedFaqTranslator,
  max = 24
): SupportFaqItem[] {
  const items: SupportFaqItem[] = [];
  for (let n = 1; n <= max; n++) {
    const qKey = `faq.q${n}.question`;
    const aKey = `faq.q${n}.answer`;
    if (!t.has(qKey)) break;
    items.push({ question: t(qKey), answer: t(aKey) });
  }
  return items;
}

export function buildFaqPageJsonLd(items: SupportFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
