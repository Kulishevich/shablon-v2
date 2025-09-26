import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/cart', variant });

  return {
    title: seo?.title ?? 'Корзина',
    description: seo?.description ?? 'Корзина',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Корзина',
      description: seo?.og_description ?? 'Корзина',
    },
  };
};

export default async function CartLayout({
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
