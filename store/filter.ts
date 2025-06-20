import { create } from "zustand";

export type Sort = "name" | "salePrices";
export type Direction = "desc" | "asc";

type FilterState = {
  sort: Sort;
  direction: Direction;
  brand_slug: string;
  setSort: (sort: Sort) => void;
  setDirection: (direction: Direction) => void;
  setBrand: (brand: string) => void;
  clearFitler: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  sort: "name",
  direction: "asc",
  brand_slug: "",
  setSort: (sort: Sort) => {
    return set((state) => {
      return {
        ...state,
        sort,
      };
    });
  },
  setDirection: (direction: Direction) => {
    return set((state) => {
      return {
        ...state,
        direction,
      };
    });
  },
  setBrand: (brand_slug) => {
    return set((state) => {
      return {
        ...state,
        brand_slug,
      };
    });
  },
  clearFitler: () => {
    return set((state) => {
      return {
        ...state,
        brand_slug: "",
        direction: "asc",
        sort: "name",
      };
    });
  },
}));
