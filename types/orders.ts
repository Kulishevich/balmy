export interface IOrders {
  individual: IOrderItem[];
  legal_entity: [];
  total_count: 12;
}

export interface IOrderItem {
  id: number;
  moysklad_id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  email: string;
  order_date: string;
  comment: string;
  delivery_cost: string;
  status_id: string | null;
  payment_method: string | null;
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
  status: IOrderStatus | null;
  items: IOrderProduct[];
}

export interface IOrderStatus {
  id: number;
  name: string;
  code: string;
  color: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IOrderProduct {
  created_at: string;
  discount: string;
  discount_amount: string;
  discount_id: string | null;
  discount_type: string | null;
  id: number;
  order_id: number;
  price: string;
  product_id: number;
  product_images: string | null;
  product_name: string;
  product_sku: string;
  quantity: number;
  specifications: string | null;
  total: string;
  total_amount: string;
  updated_at: string;
}
