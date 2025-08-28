export type PromotionsResponse = {
  current_page: number;
  data: PromotionT[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type PromotionT = {
  id: number;
  title: string | null;
  slug: string | null;
  content: string | null;
  photo_path: string | null;
  start_date: string | null;
  end_date: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};
