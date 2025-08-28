import { getCategoryByPath } from '@/shared/api/category/getCategoryByPath';
import { getProductById } from '@/shared/api/product/getProductById';
import { getSeoTag } from '@/shared/api/seo/getSeoTag';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { enrichProductWithFullPath, validateProductPath } from '@/shared/lib/utils/productUtils';
import { cookies } from 'next/headers';
import { geCategoryMask } from '@/shared/api/meta-tags/geCategoryMask';
import { getProductMask } from '@/shared/api/meta-tags/getProductMask';

interface LayoutProps {
  params: Promise<{ slug: string[] }>;
  children: ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;

  const { category } = await getCategoryByPath({ slugs: slug, variant });

  if (category) {
    const seo = await getSeoTag({ tag: category.slug, variant });
    const categoryMask = await geCategoryMask({ category, variant });

    return {
      title: seo?.title || categoryMask?.title || category.name,
      description:
        seo?.description || categoryMask?.description || category.description.slice(0, 150),
      keywords: seo?.keywords || categoryMask?.keywords,
      openGraph: {
        title: seo?.og_title || categoryMask?.title || category.name,
        description:
          seo?.og_description || categoryMask?.description || category.description.slice(0, 150),
      },
    };
  }

  const lastSlug = slug[slug.length - 1];
  let product = await getProductById({ id: lastSlug, variant });

  if (product) {
    product = await enrichProductWithFullPath({ product, variant });
    const seo = await getSeoTag({ tag: product.slug, variant });
    const productMask = await getProductMask({ product, variant });

    const isValidPath = await validateProductPath({ product, pathSlugs: slug, variant });

    if (!isValidPath) {
      return {
        title: 'Страница не найдена',
        description: 'Запрашиваемая страница не найдена',
      };
    }

    return {
      title: seo?.title ?? productMask?.title ?? product.name,
      description:
        seo?.description ?? productMask?.description ?? product.description.slice(0, 150),
      keywords: seo?.keywords ?? productMask?.keywords,
      openGraph: {
        title: seo?.og_title ?? productMask?.title ?? product.name,
        description:
          seo?.og_description ?? productMask?.description ?? product.description.slice(0, 150),
      },
    };
  }

  return {
    title: 'Страница не найдена',
  };
}

export default async function Layout({ params, children }: LayoutProps) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const { slug } = await params;

  const { category } = await getCategoryByPath({ slugs: slug, variant });

  if (category) {
    return <>{children}</>;
  }

  const lastSlug = slug[slug.length - 1];
  let product = await getProductById({ id: lastSlug, variant });

  if (product) {
    product = await enrichProductWithFullPath({ product, variant });

    const isValidPath = await validateProductPath({ product, pathSlugs: slug, variant });

    if (!isValidPath) {
      notFound();
    }

    return <>{children}</>;
  }

  notFound();
}
