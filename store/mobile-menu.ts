import { preventScroll } from "@/utils/helper";
import { create } from "zustand";

type MobileMenuState = {
  isOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  openMobileMenu: () => {
    return set((state) => {
      preventScroll(true);

      return {
        ...state,
        isOpen: true,
      };
    });
  },
  closeMobileMenu: () =>
    set((state) => {
      preventScroll(false);

      return { ...state, isOpen: false };
    }),
}));
