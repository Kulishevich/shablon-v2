import { CatalogSection } from '@/widgets/catalog-section';
import { PreviouslyViewed } from '@/features/previously-viewed';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { getProducts } from '@/shared/api/product/getProducts';
import { Feedback } from '@/widgets/feedback/Feedback';
import { getCategoryByPath } from '@/shared/api/category/getCategoryByPath';

import { getProductsWithoutPagination } from '@/shared/api/product/getProductsWithoutPagination';
import { CanonicalLink } from '@/shared/ui/canonical-link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/shared/api/product/getProductById';
import { ProductSection } from '@/widgets/product-info';
import { SeoBlock } from '@/entities/seo-block';
import { getReviews } from '@/shared/api/reviews/getReviews';

import { CategoryT } from '@/shared/api/category/types';
import { ProductT } from '@/shared/api/product/types';
import {
  validateProductPath,
  enrichProductWithFullPath,
  enrichProductsWithFullPath,
} from '@/shared/lib/utils/productUtils';
import { getProductsAdvantages } from '@/shared/api/advantages/getProductsAdvantages';
import { cookies } from 'next/headers';
import { getDeliveryAndPayment } from '@/shared/api/delivery-and-payment/getDeliveryPayment';
import { getTags } from '@/shared/api/tags/getTags';
import { parseFiltersFromSearchParams } from '@/shared/lib/utils/filtersUtils';
import { convertProductsBrandsToStandardBrands } from '@/shared/lib/utils/brandUtils';
import { getProductReview } from '@/shared/api/reviews/getProductReview';

export default async function Catalog({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    page?: string;
    sort_direction?: string;
    sort_by?: string;
    search?: string;
    price_from?: string;
    price_to?: string;
    brand?: string;
    tags?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;
  const searchParamsData = await searchParams;
  const { page, sort_by, sort_direction, search, price_from, price_to, brand, tags } =
    searchParamsData;

  // Проверяем специальный случай /catalog/all
  if (slug.length === 1 && slug[0] === 'all') {
    return await renderAllProductsSection({
      page,
      sort_by,
      sort_direction,
      search,
      price_from,
      price_to,
      brand,
      tags,
      searchParamsData,
    });
  }

  // Сначала пробуем найти категорию
  const { category, categoryPath } = await getCategoryByPath({ slugs: slug, variant });

  if (category) {
    // Если категория найдена, показываем каталог
    return await renderCatalogSection({
      category,
      categoryPath,
      page,
      sort_by,
      sort_direction,
      search,
      price_from,
      price_to,
      brand,
      tags,
      searchParamsData,
      slug,
    });
  }

  // Если категория не найдена, пробуем найти продукт по последнему slug
  const lastSlug = slug[slug.length - 1];
  let product = await getProductById({ id: lastSlug, variant });

  if (product) {
    // Обогащаем продукт полным путем
    product = await enrichProductWithFullPath({ product, variant });

    // Проверяем корректность пути до продукта
    const isValidPath = await validateProductPath({ product, pathSlugs: slug, variant });

    if (!isValidPath) {
      // Если путь неверный, показываем 404
      notFound();
    }

    // Если продукт найден и путь корректный, показываем страницу продукта
    return await renderProductSection(product, slug);
  }

  // Если ни категория, ни продукт не найдены - 404
  notFound();
}

async function renderAllProductsSection({
  page,
  sort_by,
  sort_direction,
  search,
  price_from,
  price_to,
  brand,
  tags,
  searchParamsData,
}: {
  page?: string;
  sort_by?: string;
  sort_direction?: string;
  search?: string;
  price_from?: string;
  price_to?: string;
  brand?: string;
  tags?: string;
  searchParamsData: Record<string, string | undefined>;
}) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  // Сначала получаем продукты без фильтров для получения доступных фильтров
  const initialProducts = await getProducts({
    page: '1',
    per_page: '1', // Минимум для получения метаданных
    tags,
    variant,
  });

  // Преобразуем фильтры из URL параметров в формат API
  const allFiltersForApi = parseFiltersFromSearchParams(
    searchParamsData,
    initialProducts?.filters || []
  );

  // Получаем все продукты с фильтрацией по тегам
  const products = await getProducts({
    page,
    sort_by,
    sort_direction,
    search,
    price_from,
    price_to,
    brand,
    tags,
    filters: allFiltersForApi,
    variant,
  });

  // Обогащаем продукты полным путем
  if (products?.data && products.data.data) {
    products.data.data = await enrichProductsWithFullPath({
      products: products.data.data,
      variant,
    });
  }

  const allProducts = await getProductsWithoutPagination({
    search,
    tags,
  });

  const allTags = await getTags({ variant });

  // Получаем дерево категорий для фильтров
  const { getCategoriesTree } = await import('@/shared/api/category/getCategoriesTree');
  const allCategories = await getCategoriesTree({ variant });

  // Преобразуем фильтры из URL параметров в формат API
  const filtersForApi = parseFiltersFromSearchParams(searchParamsData, products?.filters || []);

  const prices = allProducts?.map((product) => Number(product.price)) ?? [];

  // Формируем breadcrumbs
  const breadcrumbsPath = [
    {
      title: 'Все товары',
      path: '/catalog/all',
    },
  ];

  // Формируем канонический URL
  const canonicalUrl = '/catalog/all';

  // Создаем фиктивную категорию для отображения всех товаров
  const allCategory: CategoryT = {
    id: 0,
    name: tags ? `Все товары по тегу` : 'Все товары',
    slug: 'all',
    description: '',
    photo_path: '',
    is_active: true,
    parent_id: null,
    created_at: '',
    updated_at: '',
    order: 0,
    filters: null,
    subcategories: [],
  };

  return (
    <>
      <CanonicalLink href={canonicalUrl} />
      <Breadcrumbs dynamicPath={breadcrumbsPath} />
      <main className="main-container">
        <CatalogSection
          variant={variant || ''}
          products={products}
          category={allCategory}
          page={page || '1'}
          brands={convertProductsBrandsToStandardBrands(products?.brands || [])}
          minPrice={0}
          maxPrice={products?.price_range?.max || 0}
          categoryPath={[]}
          allCategories={allCategories || undefined}
          tags={allTags || undefined}
          currentPath={canonicalUrl}
          filters={products?.filters || []}
        />
        <PreviouslyViewed variant={variant || ''} />
        <SeoBlock page={canonicalUrl} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}

async function renderCatalogSection({
  category,
  categoryPath,
  page,
  sort_by,
  sort_direction,
  search,
  price_from,
  price_to,
  brand,
  tags,
  searchParamsData,
  slug,
}: {
  category: CategoryT;
  categoryPath: CategoryT[];
  page?: string;
  sort_by?: string;
  sort_direction?: string;
  search?: string;
  price_from?: string;
  price_to?: string;
  brand?: string;
  tags?: string;
  searchParamsData: Record<string, string | undefined>;
  slug: string[];
}) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  // Сначала получаем продукты без фильтров для получения доступных фильтров
  const initialProducts = await getProducts({
    category_id: category.id.toString(),
    page: '1',
    per_page: '1', // Минимум для получения метаданных
    variant,
  });

  // Преобразуем фильтры из URL параметров в формат API
  const categoryFiltersForApi = parseFiltersFromSearchParams(
    searchParamsData,
    initialProducts?.filters || []
  );

  // Получаем продукты для данной категории
  const products = await getProducts({
    category_id: category.id.toString(),
    page,
    sort_by,
    sort_direction,
    search,
    price_from,
    price_to,
    brand,
    tags,
    filters: categoryFiltersForApi,
    variant,
  });

  // Обогащаем продукты полным путем
  if (products?.data && products.data.data) {
    products.data.data = await enrichProductsWithFullPath({
      products: products.data.data,
      variant,
    });
  }

  const allTags = await getTags({ variant, category: category.id.toString() });

  // Получаем дерево категорий для фильтров
  const { getCategoriesTree } = await import('@/shared/api/category/getCategoriesTree');
  const allCategories = await getCategoriesTree({ variant });

  // Формируем breadcrumbs на основе пути категорий
  const breadcrumbsPath = [
    ...categoryPath.map((cat) => ({
      title: cat.name,
      path: `/${cat.slug}`,
    })),
  ];

  // Формируем канонический URL
  const canonicalUrl = `catalog/${slug.join('/')}`;

  return (
    <>
      <CanonicalLink href={canonicalUrl} />
      <Breadcrumbs dynamicPath={breadcrumbsPath} />
      <main className="main-container">
        <CatalogSection
          variant={variant || ''}
          tags={allTags || undefined}
          products={products}
          category={category}
          page={page || '1'}
          brands={convertProductsBrandsToStandardBrands(products?.brands || [])}
          minPrice={0}
          maxPrice={products?.price_range?.max || 0}
          categoryPath={categoryPath}
          allCategories={allCategories || undefined}
          currentPath={canonicalUrl}
          filters={products?.filters || []}
        />
        <PreviouslyViewed variant={variant || ''} />
        <SeoBlock page={canonicalUrl} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}

async function renderProductSection(product: ProductT, slug: string[]) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const reviews = await getProductReview({ variant, productId: product.id.toString() });
  const advantages = await getProductsAdvantages({ variant });
  const deliveryAndPayment = await getDeliveryAndPayment({ variant });

  const breadcrumbsPath = [
    ...product.breadcrumb.map((category) => ({
      title: category.name,
      path: `/${category.slug}`,
    })),
    {
      title: product.name,
      path: `/${product.slug}`,
    },
  ];

  const canonicalUrl = `catalog/${slug.join('/')}`;

  return (
    <>
      <CanonicalLink href={canonicalUrl} />
      <Breadcrumbs dynamicPath={breadcrumbsPath} />
      <main className="main-container">
        <ProductSection
          product={product}
          reviews={reviews}
          advantages={advantages}
          deliveryAndPayment={deliveryAndPayment}
        />
        <PreviouslyViewed variant={variant || ''} />
        <SeoBlock page={canonicalUrl} />
        <Feedback variant={variant} />
      </main>
    </>
  );
}
