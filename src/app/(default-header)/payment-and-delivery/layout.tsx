import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const seo = await getSeoTag({ tag: '/payment-and-delivery', variant });

  return {
    title: seo?.title ?? 'Оплата и доставка',
    description: seo?.description ?? 'Оплата и доставка',
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? 'Оплата и доставка',
      description: seo?.og_description ?? 'Оплата и доставка',
    },
  };
};

export default async function PaymentAndDeliveryLayout({
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
