import { CategoryT } from '../category/types';
import { BrandT } from '../brands/types';

export type ProductsBrandT = {
  id: number;
  name: string;
  slug: string;
  image_path: string;
};

export type ProductsResponseT = {
  success: boolean;
  data: {
    current_page: number;
    data: ProductT[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  },
  price_range: {
    min: number;
    max: number;
  };
  filters: FilterT[];
  brands: ProductsBrandT[];
};

export type FilterT = {
  id: number;
  name: string;
  slug: string;
  type: string;
  unit: string | null;
  values: string[];
};

export type ProductT = {
  id: number;
  name: string;
  slug: string;
  breadcrumb: BreadcrumbItem[];
  description: string;
  photo_path: string;
  price: string;
  discount: string;
  is_popular: boolean;
  is_novelty: boolean;
  sku: string;
  specifications: SpecificationT[] | null;
  is_active: boolean;
  category_id: number;
  manufacturer_id: number | null;
  created_at: string;
  updated_at: string;
  order: number;
  category: CategoryT;
  images: ImageT[];
  main_image: ImageT;
  brand: BrandT;
  fullPath?: string[]; // Полный путь до продукта [category1, category2, ..., product]
  tags: ProductTag[];
  reviews_count: number;
  rating: number;
};

type BreadcrumbItem = {
  id: number;
  name: string;
  slug: string;
  url: string;
};

export type ProductTag = {
  id: number;
  name: string;
  color: string;
  photo_path: string;
  is_active: boolean;
  pivot: {
    product_id: string;
    tag_id: string;
  };
};

export type SpecificationT = {
  id: number;
  name: string;
  slug: string;
  type: string;
  unit: string;
  order: number;
  filterable: false;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    specification_id: number;
    value: string;
    created_at: string;
    updated_at: string;
  };
};

export type ImageT = {
  id: number;
  product_id: number;
  image_path: string;
  order: number;
  is_main: boolean;
  created_at: string;
  updated_at: string;
};
