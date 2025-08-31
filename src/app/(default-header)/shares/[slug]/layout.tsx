import { getPromotion } from '@/shared/api/promotions/getPromotion';
import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { cookies } from 'next/headers';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const slug = (await params).slug;
  const seo = await getSeoTag({ tag: `/shares/${slug}`, variant });
  const promotion = await getPromotion({ slug, variant });

  return {
    title: seo?.title ?? promotion?.title,
    description: seo?.description ?? promotion?.content?.slice(0, 150),
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? promotion?.title,
      description: seo?.og_description ?? promotion?.content?.slice(0, 150),
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
