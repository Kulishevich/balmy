import { showToast } from "@/components/toast";
import { CartProduct } from "@/types/product";
import { create } from "zustand";

interface CartStore {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (slug: string) => void;
  addQuantity: (slug: string) => void;
  minusQuantity: (slug: string) => void;
  clearCart: () => void;
  initialize: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getCartTotalDiscount: () => number;
  getCartProduct: (slug: string) => CartProduct | undefined; // Возвращаем товар или undefined
}

const getStoredCart = (): CartProduct[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToStorage = (cart: CartProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const isProductInCart = state.cart.some(
        (cartProduct) => cartProduct.slug === product.slug
      );

      if (isProductInCart) {
        return { cart: state.cart };
      }

      showToast({ title: "Товар добавлен в корзину", variant: "success" });

      const updatedCart = [
        ...state.cart,
        { ...product, price: product.discountPrices * product.quantity },
      ];
      saveCartToStorage(updatedCart);
      return { cart: updatedCart };
    }),
  removeFromCart: (slug) =>
    set((state) => {
      showToast({ title: "Товар удален из корзины", variant: "success" });

      const updatedCart = state.cart.filter(
        (cartProduct) => cartProduct.slug !== slug
      );

      saveCartToStorage(updatedCart);
      return { cart: updatedCart };
    }),
  addQuantity: (slug) =>
    set((state) => {
      const updatedCart = state.cart.map((cartProduct) =>
        cartProduct.slug === slug
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            }
          : cartProduct
      );

      const updatedCartWithPrice = updatedCart.map((cartProduct) => ({
        ...cartProduct,
        price: cartProduct.discountPrices * cartProduct.quantity,
      }));

      saveCartToStorage(updatedCartWithPrice);
      return { cart: updatedCartWithPrice };
    }),
  minusQuantity: (slug) =>
    set((state) => {
      const updatedCart = state.cart.map((cartProduct) =>
        cartProduct.slug === slug && cartProduct.quantity > 1
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            }
          : cartProduct
      );

      const updatedCartWithPrice = updatedCart.map((cartProduct) => ({
        ...cartProduct,
        price: cartProduct.discountPrices * cartProduct.quantity,
      }));

      saveCartToStorage(updatedCartWithPrice);
      return { cart: updatedCartWithPrice };
    }),
  clearCart: () => {
    saveCartToStorage([]);
    set({ cart: [] });
  },
  initialize: () => {
    const savedCart = getStoredCart();
    set({ cart: savedCart });
  },
  getCartItemCount: () => {
    const { cart } = get();
    return cart.length;
  },
  getCartTotal: () => {
    const { cart } = get();
    const cartTotal = cart.reduce((total, product) => total + product.price, 0);

    return cartTotal;
  },
  getCartTotalDiscount: () => {
    const { cart } = get();
    return cart.reduce(
      (totalDiscount, product) =>
        totalDiscount +
        (product.basePrice - product.discountPrices) * product.quantity,
      0
    );
  },
  getCartProduct: (slug) => {
    const { cart } = get();
    return cart.find((product) => product.slug === slug);
  },
}));
