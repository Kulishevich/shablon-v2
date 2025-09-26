import { Feedback } from '@/widgets/feedback/Feedback';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { SeoBlock } from '@/entities/seo-block';
import { cookies } from 'next/headers';
import { ServicesList } from '@/widgets/services-list';

const services = [
  { title: 'Service 1', slug: 'service-1', photo_path: '/styles-1.png' },
  { title: 'Service 2', slug: 'service-2', photo_path: '/styles-1.png' },
  { title: 'Service 3', slug: 'service-3', photo_path: '/styles-1.png' },
  { title: 'Service 4', slug: 'service-4', photo_path: '/styles-1.png' },
];

export default async function News({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const page = (await searchParams).page || '1';

  return (
    <>
      <Breadcrumbs className="breadcrumbs" />
      <main>
        <ServicesList services={services} variant={variant} />
        <SeoBlock page="/services" />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
