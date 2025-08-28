import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/privacy-policy', variant });

  return {
    title: seo?.title ?? 'Политика конфиденциальности',
    description: seo?.description ?? 'Политика конфиденциальности',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Политика конфиденциальности',
      description: seo?.og_description ?? 'Политика конфиденциальности',
    },
  };
};

export default async function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
