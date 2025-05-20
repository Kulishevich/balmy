"use client";
import { useState, useEffect } from "react";

interface ScreenSize {
  width: number | null;
  height: number | null;
  isMobile: boolean | null;
  isTablet: boolean | null;
  isDesktop: boolean | null;
}

export function useScreenSize() {
  const windowExists = typeof window !== "undefined";

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: null,
    height: null,
    isMobile: null,
    isTablet: null,
    isDesktop: null,
  });

  useEffect(() => {
    if (windowExists) {
      function handleResize() {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: window.innerWidth < 640,
          isTablet: window.innerWidth < 1024,
          isDesktop: window.innerWidth < 1536,
        });
      }

      // Initialize screen size on mount
      handleResize();

      // Listen for resize events
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [windowExists]);

  return screenSize;
}
