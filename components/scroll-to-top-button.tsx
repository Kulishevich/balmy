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
      className={`fixed bottom-10 right-10 z-[999] rounded-full bg-light-gold w-[100px] h-[100px] text-black flex items-center justify-center transition-all duration-500 hover:bg-green-dark hover:scale-105 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="flex flex-col items-center justify-center gap-1 border border-black rounded-full w-24 h-24">
        <ArrowUpLong />
        <span>Наверх</span>
      </span>
    </button>
  );
};

export default ScrollToTopButton;
