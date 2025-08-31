import { SeoBlock } from '@/entities/seo-block';
import { CatalogProducts } from '@/widgets/catalog-products';
import { getCategories } from '@/shared/api/category/getCategories';
import { Feedback } from '@/widgets/feedback/Feedback';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { cookies } from 'next/headers';

export default async function Catalog() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const categories = await getCategories({ variant });

  return (
    <>
      <Breadcrumbs />
      <main>
        <CatalogProducts title="Каталог" categories={categories} />

        <SeoBlock page="/catalog" />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
