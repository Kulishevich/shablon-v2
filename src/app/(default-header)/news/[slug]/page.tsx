import { NewsInfoSection } from '@/widgets/news-info-section';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { NewsCard } from '@/entities/news-card';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { getAllNews } from '@/shared/api/news/getAllNews';
import { getNews } from '@/shared/api/news/getNews';
import { Feedback } from '@/widgets/feedback/Feedback';
import { paths } from '@/shared/config/constants/paths';
import { notFound } from 'next/navigation';
import { SeoBlock } from '@/entities/seo-block';
import { cookies } from 'next/headers';
import { NewsSlider } from '@/widgets/news-slider';

export default async function New({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;
  const news = await getNews({ slug, variant });

  if (!news) {
    notFound();
  }

  const newsList = await getAllNews({ variant });
  const otherNews = newsList?.data?.filter((elem) => elem.id !== news.id);

  return (
    <>
      <Breadcrumbs
        dynamicPath={[
          {
            title: news?.title || '',
            path: `${paths.news}/${news?.slug}`,
          },
        ]}
        className="breadcrumbs"
      />
      <main>
        <NewsInfoSection news={news} variant={variant} />
        {!!otherNews?.length && (
          <NewsSlider title="Другие новости" newsList={otherNews} variant={variant} />
        )}
        <SeoBlock page={`/news/${news?.slug}`} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
