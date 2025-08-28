import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/shares', variant });

  return {
    title: seo?.title ?? 'Акции',
    description: seo?.description ?? 'Акции',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Акции',
      description: seo?.og_description ?? 'Акции',
    },
  };
};

export default async function SharesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
