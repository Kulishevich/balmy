import { create } from "zustand";

export type Sort = "name" | "salePrices";
export type Direction = "desc" | "asc";

type FilterState = {
  sort: Sort;
  direction: Direction;
  brand: string;
  setSort: (sort: Sort) => void;
  setDirection: (direction: Direction) => void;
  setBrand: (brand: string) => void;
  clearFitler: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  sort: "name",
  direction: "asc",
  brand: "",
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
  setBrand: (brand) => {
    return set((state) => {
      return {
        ...state,
        brand,
      };
    });
  },
  clearFitler: () => {
    return set((state) => {
      return {
        ...state,
        brand: "",
        direction: "asc",
        sort: "name",
      };
    });
  },
}));
