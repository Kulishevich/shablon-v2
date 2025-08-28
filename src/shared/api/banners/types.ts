export type BannerT = {
  id: number;
  photo_path: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  button_text: string | null;
  button_link: string | null;
  image_path: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
