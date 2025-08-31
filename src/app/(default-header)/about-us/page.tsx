import { SeoBlock } from '@/entities/seo-block';
import { getAboutBlocks } from '@/shared/api/about/getAboutBlocks';
import { getAdvantages } from '@/shared/api/advantages/getAdvantages';
import { getPhotos } from '@/shared/api/photos/getPhotos';
import { getReviews } from '@/shared/api/reviews/getReviews';
import { AboutSection } from '@/widgets/about-section';
import { AdvantagesSection } from '@/widgets/advantages-section';
import { Feedback } from '@/widgets/feedback/Feedback';
import { GallerySection } from '@/widgets/gallery-section/GallerySection';
import { MissionSection } from '@/widgets/mission-section';
import { ReviewsSection } from '@/widgets/reviews-section';
import { cookies } from 'next/headers';

export default async function AboutUs() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const advantages = await getAdvantages({ variant });
  const photos = await getPhotos({ variant });
  const reviews = await getReviews({ variant });
  const aboutResponse = await getAboutBlocks({ variant });

  return (
    <main>
      <AboutSection
        items={aboutResponse?.about.content_blocks?.filter(
          (block) => block.type !== 'feature_section'
        )}
        variant={variant}
      />
      {aboutResponse?.about.content_blocks
        ?.filter((block) => block.type === 'feature_section')
        .map((block, index) => <MissionSection key={index} {...block.content} variant={variant} />)}
      <AdvantagesSection advantages={advantages} />
      {!!reviews?.length && <ReviewsSection reviews={reviews} variant={variant} />}
      {!!photos?.length && <GallerySection items={photos} />}
      <SeoBlock page="/about-us" />
      <Feedback variant={variant} />
    </main>
  );
}
