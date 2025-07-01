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
  status: string | null;
  items: [];
}
