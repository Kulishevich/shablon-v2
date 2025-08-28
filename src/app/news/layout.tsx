import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/news', variant });

  return {
    title: seo?.title ?? 'Новости',
    description: seo?.description ?? 'Новости',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Новости',
      description: seo?.og_description ?? 'Новости',
    },
  };
};

export default async function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
