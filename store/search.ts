import { SearchResult } from "@/types/search-result";
import { create } from "zustand";

type SearchState = {
  show: boolean;
  searchQuery: string;
  searchResult: SearchResult[];
  setSearchQuery: (searchQuery: string) => void;
  setSearchResult: (searchResult: SearchResult[]) => void;
  cleanSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  show: false,
  searchQuery: "",
  searchResult: [],
  setSearchQuery: (searchQuery: string) => {
    return set((state) => {
      return { ...state, searchQuery };
    });
  },
  setSearchResult: (searchResult: SearchResult[]) => {
    return set((state) => {
      return { ...state, searchResult };
    });
  },
  cleanSearch: () => {
    return set((state) => {
      return { ...state, searchQuery: "", searchResult: [] };
    });
  },
  openSearch: () => {
    return set((state) => {
      return { ...state, show: true };
    });
  },
  closeSearch: () => {
    return set((state) => {
      return { ...state, show: false };
    });
  },
}));
