import { Product } from "./product";

export interface IOrders {
  individual: IOrderItem[];
  legal_entity: [];
  total_count: 12;
}

export interface IOrderItem {
  id: number;
  client_id: string | null;
  moysklad_id: string;
  client_moysklad_id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  email: string;
  order_date: string;
  comment: string;
  delivery_cost: string;
  status_id: string;
  payment_method: string | null;
  delivery_method: string | null;
  is_paid: boolean;
  total_amount: string;
  total_discount: string;
  promo_code: string | null;
  promo_discount: string;
  created_at: string;
  updated_at: string;
  last_synced_at: string | null;
  moysklad_updated_at: string | null;
  sync_status: string;
  sync_error: string | null;
  items: IOrderItem[];
  status: IOrderStatus;
}

export interface IOrderStatus {
  id: number;
  name: string;
  code: string;
  color: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IOrderItem {
  id: number;
  order_id: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  quantity: 1;
  price: string;
  discount: string;
  total: string;
  discount_amount: string;
  discount_type: string | null;
  discount_id: string | null;
  total_amount: string;
  specifications: string | null;
  created_at: string;
  updated_at: string;
  product_images: string | null;
  product: Product;
}

export interface IOrderStatus {
  id: number;
  name: string;
  code: string;
  color: string;
}

export interface IOrderProduct {
  id: number;
  moysklad_id: string;
  name: string;
  slug: string | null;
  description: string;
  country: string;
  quantity: number;
  weight: string;
  volume: string;
  uom: string | null;
  article: string;
  barcodes: {
    ean13: string;
  }[];
  min_price: string;
  buy_price: string;
  photo_path: string | null;
  price: string;
  stock: number;
  discount: string;
  is_popular: boolean;
  is_novelty: boolean;
  sku: string;
  specifications: string | null;
  is_active: boolean;
  is_deleted_locally: boolean;
  category_id: string;
  manufacturer_id: string | null;
  created_at: string;
  updated_at: string;
  last_synced_at: string | null;
  moysklad_updated_at: string | null;
  sync_status: string;
  sync_error: string | null;
  order: number;
  brand_id: string;
  is_available: boolean;
  images: [];
  main_image: string | null;
}

export interface MaxBonusPointsData {
  token: string;
  order_amount: number;
}

export interface MaxBonusPointsResponse {
  success: true;
  data: {
    max_bonus_points: 0;
    available_bonus_points: 0;
    order_amount: 1000;
    max_percentage: 20;
  };
}
