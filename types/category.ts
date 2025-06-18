export interface Category {
  created_at: string;
  description: string;
  filters: null;
  id: number;
  is_active: boolean;
  name: string;
  order: number;
  parent_id: string | null;
  photo_path: string | null;
  slug: string;
  subcategories: Omit<Category, "subcategories">[];
  updated_at: string;
}
