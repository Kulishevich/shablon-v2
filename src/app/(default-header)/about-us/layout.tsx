import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/about-us', variant });

  return {
    title: seo?.title ?? 'О нас',
    description: seo?.description ?? 'О нас',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'О нас',
      description: seo?.og_description ?? 'О нас',
    },
  };
};

export default async function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumbs className="breadcrumbs" />
      {children}
    </>
  );
}
