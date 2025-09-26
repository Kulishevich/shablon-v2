import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Feedback } from '@/widgets/feedback/Feedback';
import { paths } from '@/shared/config/constants/paths';
import { cookies } from 'next/headers';
import { ServiceContentSection } from '@/widgets/service-content-section';

export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;

  return (
    <>
      <Breadcrumbs
        dynamicPath={[
          {
            title: 'Услуга 1',
            path: `${paths.services}/${slug}`,
          },
        ]}
        className="breadcrumbs"
      />
      <main>
        <ServiceContentSection variant={variant} slug={slug} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
