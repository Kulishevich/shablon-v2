import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/catalog', variant });

  return {
    title: seo?.title ?? 'Каталог',
    description: seo?.description ?? 'Каталог',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Каталог',
      description: seo?.og_description ?? 'Каталог',
    },
  };
};

export default async function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
