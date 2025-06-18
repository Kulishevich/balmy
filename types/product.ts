import { Category } from "./category";

export interface ProductResponse {
  current_page: number;
  data: ProductItem[];
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
}

export interface ProductItem {
  id: number;
  moysklad_id: number | null;
  name: string;
  slug: string;
  description: string;
  photo_path: string;
  price: string;
  stock: number;
  discount: string;
  is_popular: boolean;
  is_novelty: boolean;
  sku: string;
  specifications: null;
  is_active: boolean;
  category_id: number;
  manufacturer_id: null;
  created_at: string;
  updated_at: string;
  order: number;
  brand_id: number | null;
  is_available: boolean;
  category: Category;
  main_image: ProductImage;
  brand: BrandProduct | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  photo_path: string | null;
  price: string;
  discount: string;
  is_popular: boolean;
  is_novelty: boolean;
  sku: string;
  specifications: [];
  is_active: boolean;
  category_id: number;
  manufacturer_id: string | null;
  created_at: string;
  updated_at: string;
  order: number;
  brand_id: number | null;
  category: Category;
  images: ProductImage[] | null;
  brand: BrandProduct | null;
  main_image: ProductImage;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  order: number;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandProduct {
  id: number;
  name: string;
  slug: string;
  link: string | null;
  image_path: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  basePrice: number;
  discountPrices: number;
  discount: number;
  quantity: number;
  image: string;
}
