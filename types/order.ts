import { IOrderItem } from "./orders";

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
  delivery_address: string;
  comment: string;
  client_moysklad_id: string;
  delivery_method: string;
  payment_method: string;
  items: OrderPosition[];
}

export interface OrderPosition {
  product_id: number;
  quantity: number;
}

export interface BuyOneClickOrder {
  product_id: number;
  name: string;
  phone: string;
  comment: string;
}

export interface OrderResponse {
  data: {
    order: IOrderItem;
    payment_url: string;
    moysklad_order: {
      id: string;
      name: string;
    };
  };
}
