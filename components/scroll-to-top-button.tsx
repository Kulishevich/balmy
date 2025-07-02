"use client";
import ArrowUpLong from "@/public/icons/arrow-up-long.svg";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed  right-3  bottom-[90px] lg:bottom-[172px] lg:right-[72px] z-[999] bg-gold flex gap-1 items-center p-[6px] lg:px-3 lg:py-1 rounded-[5px] transition ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUpLong />
      <span className="text-[13px] lg:text-[15px]">Наверх</span>
    </button>
  );
};

export default ScrollToTopButton;
