export interface Order {
  deliveryType: "Courier" | "Post";
  orderPositions: OrderPosition[];
  shippingPrice: number;
  paymentType: "Card" | "Cash" | "CardPhys";
  country: "Беларусь";
  comment: string;
}

export interface OrderPosition {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}
