"use client";
import { createPortal } from "react-dom";
import CallbackPopup from "@/components/callback-popup";
import BuyOneClickPopup from "@/components/buy-one-click-popup";
import { AnimatePresence, m } from "motion/react";
import { usePopupStore } from "@/store/popup";
import { popupBackgroundAnimation } from "@/utils/animations";
import FilterPopup from "./catalog/filter-popup";

function Popups() {
  const { popup, removePopup } = usePopupStore();

  if (typeof window == "undefined") return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {popup && (
            <>
              {popup.type == "callback" && <CallbackPopup />}
              {popup.type == "buy-one-click" && <BuyOneClickPopup />}
              {popup.type == "filter" && <FilterPopup />}
              <m.div
                {...popupBackgroundAnimation}
                className="fixed inset-0 bg-dark-gray/70 z-10"
                onClick={removePopup}
              ></m.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default Popups;
