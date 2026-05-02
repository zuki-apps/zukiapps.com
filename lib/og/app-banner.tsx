import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/hreflang';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

type OgNamespaceMode = 'hero' | 'meta' | 'home';

export async function renderAppOgBanner(options: {
  locale: string;
  namespace: string;
  iconPath: string;
  mode?: OgNamespaceMode;
}) {
  const mode = options.mode ?? 'hero';
  const t = await getTranslations({ locale, namespace: options.namespace });
  const baseUrl = getSiteUrl();
  const iconUrl = `${baseUrl}${options.iconPath.startsWith('/') ? options.iconPath : `/${options.iconPath}`}`;

  let title: string;
  let subtitle: string;
  if (mode === 'meta') {
    title = t('meta.title');
    subtitle = t('meta.description');
  } else if (mode === 'home') {
    title = t('subtitle');
    subtitle = t('tagline');
  } else {
    title = t('hero.title');
    subtitle = t('hero.description');
  }

  return renderBrandedLayoutImage({ title, subtitle, iconUrl });
}

export async function renderLegalOgBanner(options: { title: string; subtitle: string; iconPath: string }) {
  const baseUrl = getSiteUrl();
  const iconUrl = `${baseUrl}${options.iconPath.startsWith('/') ? options.iconPath : `/${options.iconPath}`}`;
  return renderBrandedLayoutImage({
    title: options.title,
    subtitle: options.subtitle,
    iconUrl,
  });
}

function renderBrandedLayoutImage(options: { title: string; subtitle: string; iconUrl: string }) {
  const { title, subtitle, iconUrl } = options;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 42%, #312e81 100%)',
          padding: 56,
          gap: 48,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          alt=""
          width={260}
          height={260}
          style={{
            borderRadius: 40,
            objectFit: 'contain',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '2px solid rgba(148, 163, 184, 0.35)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.12,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: '#cbd5e1', lineHeight: 1.35 }}>{subtitle}</div>
          <div style={{ fontSize: 22, color: '#94a3b8' }}>zukiapps.com</div>
        </div>
      </div>
    ),
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
    }
  );
}
