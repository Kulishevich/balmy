import { Product } from "@/types/product";
import { create } from "zustand";

type BuyOneClickState = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const useBuyOneClickStore = create<BuyOneClickState>((set) => ({
  product: null,
  setProduct: (product) => {
    return set((state) => ({
      ...state,
      product,
    }));
  },
}));
