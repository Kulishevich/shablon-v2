export type ReviewT = {
  id: number;
  author_name: string;
  author_photo: string;
  published_at: string;
  rating: number;
  title: string;
  review_text: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

export type ReviewPostT = {
  name: string,
  phone: string,
  title: string,
  comment?: string,
  rating: number,
  photo?: File,
};

export type ReviewPostResponseT = {
  success: true,
  message: string,
  data: ReviewT,
}