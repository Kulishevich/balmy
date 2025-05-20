import { MAX_VIEWED_PRODUCTS } from "@/utils/constants";
import { create } from "zustand";

type ViewedProduct = {
  image: string;
  slug: string;
};

interface ViewedProductsStore {
  viewedProducts: ViewedProduct[];
  addProduct: (product: ViewedProduct) => void;
  initialize: () => void;
}

const getStoredProducts = (): ViewedProduct[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const savedProducts = localStorage.getItem("viewedProducts");
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const saveProductsToStorage = (products: ViewedProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("viewedProducts", JSON.stringify(products));
  }
};

export const useViewedProductsStore = create<ViewedProductsStore>((set) => ({
  viewedProducts: [],
  addProduct: (product) =>
    set(() => {
      const existingProducts = getStoredProducts();

      const updatedProducts = [
        product,
        ...existingProducts.filter((p) => p.slug !== product.slug),
      ].slice(0, MAX_VIEWED_PRODUCTS);

      saveProductsToStorage(updatedProducts);

      return { viewedProducts: updatedProducts };
    }),
  initialize: () => {
    const savedProducts = getStoredProducts();
    set({ viewedProducts: savedProducts });
  },
}));
