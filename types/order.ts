export interface Order {
  deliveryType: string;
  shippingPrice: number;
  paymentType: string;
  country: string;
  comment: string;
  items: OrderPosition[];
}

export interface OrderRequest {
  customer_name: string;
  phone: string;
  email?: string;
  address: string;
  comment: string;
  delivery_method_id: string;
  payment_method_id: string;
  promo_code: string;
  items: OrderPosition[];
}

export interface OrderPosition {
  product_id: number;
  quantity: number;
}
