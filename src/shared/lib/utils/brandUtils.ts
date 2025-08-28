import { BrandT } from '@/shared/api/brands/types';
import { ProductsBrandT } from '@/shared/api/product/types';

/**
 * Преобразует бренды из формата ProductsResponse в формат BrandT
 */
export function convertProductsBrandsToStandardBrands(productsBrands: ProductsBrandT[]): BrandT[] {
  return productsBrands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    link: null,
    image_path: brand.image_path,
    photo_path: brand.image_path, // Используем image_path для photo_path
    order: 0,
    created_at: null,
    updated_at: null,
  }));
}
