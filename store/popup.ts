import { preventScroll } from "@/utils/helper";
import { create } from "zustand";

type Popup = {
  type: "callback" | "buy-one-click" | "filter" | "orders-filter";
};

type PopupState = {
  popup: Popup | null;
  popupData: string;
  createPopup: (popup: Popup) => void;
  removePopup: () => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  popup: null,
  popupData: "",
  createPopup: (popup) => {
    return set((state) => {
      preventScroll(true);

      return {
        ...state,
        popup,
      };
    });
  },
  removePopup: () =>
    set((state) => {
      preventScroll(false);

      return { ...state, popup: null };
    }),
}));
