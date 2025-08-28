import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/contacts', variant });

  return {
    title: seo?.title ?? 'Контакты',
    description: seo?.description ?? 'Контакты',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Контакты',
      description: seo?.og_description ?? 'Контакты',
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
