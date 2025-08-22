import { Brand } from "./brand";
import { Category } from "./category";

export interface ProductResponse {
  current_page: number;
  data: Product[];
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

export interface Product {
  brand: Brand;
  brand_id: number;
  category: Category;
  category_id: number;
  country: string;
  created_at: string;
  description: string;
  discount: string;
  id: number;
  images?: ProductImage[];
  is_active: boolean;
  is_available: boolean;
  is_novelty: boolean;
  is_popular: boolean;
  main_image: ProductImage;
  manufacturer_id: string | null;
  moysklad_id: string | null;
  name: string;
  order: number;
  photo_path: string;
  price: string;
  quantity: number;
  sku: string;
  slug: string;
  specifications: [];
  stock: number;
  updated_at: string;
  buy_price: string;
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
  id: number;
  slug: string;
  name: string;
  price: number;
  basePrice: number;
  discountPrices: number;
  discount: number;
  quantity: number;
  image: string;
}
