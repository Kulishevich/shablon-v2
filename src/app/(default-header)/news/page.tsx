import { Feedback } from '@/widgets/feedback/Feedback';
import { getAllNews } from '@/shared/api/news/getAllNews';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { NewsSection } from '@/widgets/news-section';
import { SeoBlock } from '@/entities/seo-block';
import { CanonicalLink } from '@/shared/ui/canonical-link';
import { cookies } from 'next/headers';

export default async function News({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const page = (await searchParams).page || '1';
  const newsList = await getAllNews({ page, variant });

  return (
    <>
      <CanonicalLink href={'news'} />
      <Breadcrumbs className="breadcrumbs" />
      <main>
        <NewsSection newsList={newsList} page={page} variant={variant || ''} />
        <SeoBlock page="/news" />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
