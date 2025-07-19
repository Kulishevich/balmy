import { Order, OrderPosition } from "@/types/order";
import { FREE_SHIPPING_PRICE, SHIPPING_PRICE } from "@/utils/constants";
import { create } from "zustand";
import { OrderInputs } from "@/components/delivery-payment/courier-delivery-form";
import { useCartStore } from "./cart";
import { Post } from "@/components/delivery-payment/shipping-delivery-form";

export type PaymentType =
  | "Card"
  | "Cash"
  | "CardPhys"
  | "PaymentForLegalEntity";
export type DeliveryType = "Courier" | "Post";
type Country = "Беларусь";

interface OrderState {
  deliveryType: DeliveryType;
  orderPositions: OrderPosition[];
  shippingPrice: number;
  paymentType: PaymentType;
  country: Country;
  comment: string;
  setDeliveryType: (deliveryType: DeliveryType) => void;
  setPaymentType: (paymentType: PaymentType) => void;
  setCountry: (country: Country) => void;
  setComment: (
    orderData: OrderInputs,
    conditions: {
      anonymously?: boolean;
      whenToDeliver?: "quickly" | "specific-date";
      date?: string;
      post?: Post;
    }
  ) => void;
  getOrder: () => Order;
}

export const useOrderState = create<OrderState>((set, get) => ({
  deliveryType: "Courier",
  orderPositions: [],
  shippingPrice: SHIPPING_PRICE,
  paymentType: "Card",
  country: "Беларусь",
  comment: "",

  setDeliveryType: (deliveryType) => {
    return set((state) => {
      return {
        ...state,
        deliveryType,
      };
    });
  },

  setPaymentType: (paymentType) => {
    return set((state) => {
      return {
        ...state,
        paymentType,
      };
    });
  },

  setCountry: (country) => {
    return set((state) => {
      return {
        ...state,
        country,
      };
    });
  },

  setComment: (orderData, conditions) => {
    return set((state) => {
      const { whenToDeliver, date, anonymously, post } = conditions;
      const { address, email, fullName, phone } = orderData;
      const { paymentType } = get();

      let conditionsText = "";

      if (whenToDeliver === "specific-date") {
        conditionsText += `На определенную дату: ${date}`;
      }

      if (whenToDeliver === "quickly") {
        conditionsText += "Как можно быстрее";
      }

      if (post) {
        conditionsText += post;
      }

      if (anonymously) {
        conditionsText += "Анонимно";
      }

      let paymentTypeText = "Онлайн оплата";

      if (paymentType === "Cash") {
        paymentTypeText = "Наличными при получении";
      } else if (paymentType === "CardPhys") {
        paymentTypeText = "Картой при получении";
      }

      const comment = `Адрес: ${address ?? "Не указано"}; 
      Email: ${email || "Не указано"}; 
      ФИО: ${fullName || "Не указано"};
      Телефон: ${phone || "Не указано"};
      Условия: ${conditionsText ? conditionsText : "Не указаны"};
      Способ оплаты: ${paymentTypeText};`;

      return {
        ...state,
        comment,
      };
    });
  },
  getOrder: () => {
    const { cart } = useCartStore.getState();
    const cartTotal = cart.reduce((total, product) => total + product.price, 0);
    const shippingPrice = cartTotal >= FREE_SHIPPING_PRICE ? 0 : SHIPPING_PRICE;
    const items: OrderPosition[] = cart.map((cartProduct) => {
      const { id, quantity } = cartProduct;

      return {
        product_id: id,
        quantity: quantity,
      };
    });

    const {
      setPaymentType,
      setDeliveryType,
      setCountry,
      setComment,
      getOrder,
      ...order
    } = get();

    return { ...order, items, shippingPrice };
  },
}));
