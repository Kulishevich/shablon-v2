import { ShareInfo } from '@/widgets/share-info';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { DiscountCard } from '@/entities/discount-card';
import { Feedback } from '@/widgets/feedback/Feedback';
import { getPromotion } from '@/shared/api/promotions/getPromotion';
import { getPromotions } from '@/shared/api/promotions/getPromotions';
import { notFound } from 'next/navigation';
import { SeoBlock } from '@/entities/seo-block';
import { cookies } from 'next/headers';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';

export default async function Share({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;
  const promotion = await getPromotion({ slug, variant });

  if (!promotion) {
    notFound();
  }

  const allPromotions = await getPromotions({ variant });
  const otherPromotions = allPromotions?.data.filter((elem) => elem.id !== promotion.id);

  return (
    <>
      <Breadcrumbs
        dynamicPath={[{ title: promotion.title || '', path: `/${slug}` }]}
        className="breadcrumbs"
      />
      <main>
        {!!promotion && <ShareInfo {...promotion} variant={variant} />}
        {!!otherPromotions?.length && (
          <SliderWrapper
            title="Другие акции"
            variant="discount"
            itemsCount={otherPromotions?.length}
          >
            {otherPromotions?.map((promotion, index) => (
              <DiscountCard {...promotion} key={index} />
            ))}
          </SliderWrapper>
        )}
        <SeoBlock page={`/shares/${slug}`} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
