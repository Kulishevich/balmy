interface Subcategory {
  id: string;
  subcategoryName: string;
  slug: string;
}

export interface Category {
  id: string;
  subcategories: Subcategory[];
  slug: string;
}
