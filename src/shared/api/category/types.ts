export type CategoryT = {
  id: number;
  name: string;
  slug: string;
  description: string;
  photo_path: string | null;
  parent_id: string | null;
  order: number;
  filters: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products_count?: number;
  subcategories: Omit<CategoryT, 'subcategories'>[];
};
