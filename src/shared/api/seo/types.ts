export type SeoT = {
  created_at: string;
  description: string;
  id: 1;
  keywords: string;
  name: string;
  og_description: string;
  og_title: string;
  title: string;
  updated_at: string;
};

export type SeoPageT = {
  success: boolean;
  data: {
    id: number;
    page: string;
    tag: string;
    content: string;
  };
};

export type SeoSettingsT = {
  google_tag: string | null;
  google_search_console: string | null;
  yandex_metrika: string | null;
  yandex_webmaster: string | null;
  sitemap_path: string | null;
  robots_path: string | null;
  feed_path: string | null;
  frontend_sitemap_url: string | null;
};
