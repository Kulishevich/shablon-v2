import type { Metadata } from 'next';
import { Onest, Open_Sans } from 'next/font/google';
import '@/shared/config/styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Footer } from '@/widgets/footer';
import { Toaster } from 'sonner';

import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { getCategories } from '@/shared/api/category/getCategories';
import { HeaderDesktop } from '@/widgets/header-desktop';
import { HeaderMobile } from '@/widgets/header-mobile';
import { getSetting } from '@/shared/api/design/getSetting';
import { getContacts } from '@/shared/api/design/getContacts';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { ToTop } from '@/shared/ui/to-top';
import { extractScriptContent } from '@/shared/lib/utils/extractScriptContent';
import { getSeoSettings } from '@/shared/api/seo/getSeoSettings';
import { SiteVariantButtons } from '@/widgets/site-variant-buttons';
import { cookies } from 'next/headers';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

const PhoneAnimation = dynamic(() => import('@/shared/ui/phone-animation/PhoneAnimation'));

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
});

export async function generateViewport() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;
  const settings = await getSetting({ variant });

  return {
    themeColor: settings?.colors.icon_color,
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const [data, settings] = await Promise.all([
    getSeoTag({ tag: 'home', variant }),
    getSetting({ variant }),
  ]);

  return {
    title: data?.title ?? 'Шаблон',
    description: data?.description ?? 'Шаблон',
    keywords: data?.keywords,
    openGraph: {
      title: data?.og_title ?? data?.title,
      description: data?.og_description ?? data?.description,
    },
    icons: {
      icon: `${getStoreBaseUrl(variant)}/${settings?.favicon}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const [categories, contacts, settings, seoSettings] = await Promise.all([
    getCategories({ variant }),
    getContacts({ variant }),
    getSetting({ variant }),
    getSeoSettings({ variant }),
  ]);

  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://api-maps.yandex.ru" />
        <link rel="dns-prefetch" href="https://api-maps.yandex.ru" />
        <link rel="preconnect" href={getStoreBaseUrl(variant) || ''} />
        <link rel="dns-prefetch" href={getStoreBaseUrl(variant) || ''} />
        <style>
          {`:root {
            --color-accent-1: ${settings?.colors.icon_color};
            --color-button: ${settings?.colors.button_color_static};
            --color-button-additional: ${settings?.colors.button_color_static_additional};
            --color-button-hover: ${settings?.colors.button_color_hover};
            --color-text: ${settings?.colors.main_text_color};
            --color-link: ${settings?.colors.link_color};
            --color-bg: ${settings?.colors.background_color};
            --color-bg-card: ${settings?.colors.card_background_color};
            --color-heading: ${settings?.colors.heading_color};
          }`}
        </style>
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&lang=ru_RU"
          strategy="beforeInteractive"
        />
        {seoSettings?.google_tag && (
          <Script
            id="google-tag"
            dangerouslySetInnerHTML={{
              __html: extractScriptContent(seoSettings.google_tag),
            }}
            strategy="afterInteractive"
          />
        )}
        {seoSettings?.yandex_metrika && (
          <Script
            id="yandex-metrika"
            dangerouslySetInnerHTML={{
              __html: extractScriptContent(seoSettings.yandex_metrika),
            }}
            strategy="afterInteractive"
          />
        )}
      </head>

      <body className={`${onest.variable} ${openSans.variable}`}>
        {seoSettings?.google_search_console && (
          <Script
            id="google-search-console"
            dangerouslySetInnerHTML={{
              __html: seoSettings.google_search_console,
            }}
            strategy="afterInteractive"
          />
        )}
        {seoSettings?.yandex_webmaster && (
          <Script
            id="yandex-webmaster"
            dangerouslySetInnerHTML={{ __html: seoSettings.yandex_webmaster }}
            strategy="afterInteractive"
          />
        )}

        <HeaderDesktop categories={categories || []} contacts={contacts} />
        <HeaderMobile categories={categories} contacts={contacts} />
        {children}
        <Footer categories={categories} contacts={contacts} />
        <Toaster />
        <PhoneAnimation image={settings?.feedback_image || ''} />
        <ToTop />
        <ReduxProvider>
          <SiteVariantButtons />
        </ReduxProvider>
      </body>
    </html>
  );
}
