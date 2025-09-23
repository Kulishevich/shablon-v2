import { SeoBlock } from '@/entities/seo-block';
import { CatalogProducts } from '@/widgets/catalog-products';
import { getCategories } from '@/shared/api/category/getCategories';
import { Feedback } from '@/widgets/feedback/Feedback';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';
import { CatalogList } from '@/widgets/catalog-list';
import { notFound } from 'next/navigation';
import { PreviouslyViewed } from '@/features/previously-viewed';

export default async function Catalog() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const categories = await getCategories({ variant });

  if (!categories) {
    return notFound();
  }

  return (
    <>
      <Breadcrumbs />
      <main>
        <CatalogList categories={categories} variant={variant} />
        <PreviouslyViewed variant={variant || ''} />
        <SeoBlock page="/catalog" />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
