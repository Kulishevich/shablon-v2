export type NewsListT = {
  current_page: number;
  data: NewsT[] | null;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type NewsT = {
  id: number;
  slug: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  photo_path: string | null;
  publication_date: string | null;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};
