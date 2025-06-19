export interface Brand {
  id: number;
  name: string;
  slug: string;
  link: string | null;
  image_path: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}
