import { NextResponse } from 'next/server';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getAllNews } from '@/shared/api/news/getAllNews';
import { NewsT } from '@/shared/api/news/types';
import { paths } from '@/shared/config/constants/paths';
import { getPromotions } from '@/shared/api/promotions/getPromotions';
import { PromotionT } from '@/shared/api/promotions/types';
import { getProductsWithoutPagination } from '@/shared/api/product/getProductsWithoutPagination';
import { getCategoriesTree } from '@/shared/api/category/getCategoriesTree';
import { ProductT } from '@/shared/api/product/types';
import {
  processCategoryTree,
  CategoryWithSubcategories,
} from '@/shared/api/category/processCategoryTree';
import { enrichProductsWithFullPath } from '@/shared/lib/utils/productUtils';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  try {
    const newsUrls = await getAllNews({ per_page: '10000', variant });
    const promotionsUrls = await getPromotions({ per_page: '10000', variant });
    const productsUrls = await getProductsWithoutPagination({ variant });
    const categoriesUrls = await getCategoriesTree({ variant });

    const pathWithPriority: Record<string, number> = {
      ...Object.fromEntries(Object.keys(paths).map((path) => [path, 0.8])),
      home: 1,
      news: 0.9,
      shares: 0.9,
      product: 0.9,
    };

    const fields: ISitemapField[] = Object.keys(pathWithPriority).map((page) => ({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}${page == 'home' ? '' : page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority: pathWithPriority[page],
    }));

    if (newsUrls && newsUrls.data && newsUrls.data.length > 0) {
      fields.push(
        ...newsUrls.data.map((item: NewsT) => ({
          loc: `${process.env.NEXT_PUBLIC_SITE_URL}news/${item.slug}`,
          lastmod: new Date(item.updated_at || new Date()).toISOString(),
          changefreq: 'daily' as const,
          priority: 0.8,
        }))
      );

      if (promotionsUrls && promotionsUrls.data && promotionsUrls.data.length > 0) {
        fields.push(
          ...promotionsUrls.data.map((item: PromotionT) => ({
            loc: `${process.env.NEXT_PUBLIC_SITE_URL}shares/${item.slug}`,
            lastmod: new Date(item.updated_at || new Date()).toISOString(),
            changefreq: 'daily' as const,
            priority: 0.8,
          }))
        );
      }

      if (productsUrls && productsUrls.length > 0) {
        // Обогащаем продукты полным путем
        const enrichedProducts = await enrichProductsWithFullPath({
          products: productsUrls,
          variant,
        });

        const productUrls = enrichedProducts.map((item: ProductT) => ({
          loc: `${process.env.NEXT_PUBLIC_SITE_URL}catalog/${item.fullPath?.join('/') || `${item.category.slug}/${item.slug}`}`,
          lastmod: new Date(item.updated_at || new Date()).toISOString(),
          changefreq: 'daily' as const,
          priority: 0.8,
        }));

        fields.push(...productUrls);
      }

      if (categoriesUrls && categoriesUrls.length > 0) {
        fields.push(...processCategoryTree(categoriesUrls as CategoryWithSubcategories[]));
      }
    }

    const sitemap = await getServerSideSitemap(fields);
    const xml = await sitemap.text();

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
