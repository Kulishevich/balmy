"use client";
import { Toaster } from "sonner";
import { useViewedProductsStore } from "@/store/viewed-products";
import { LazyMotion, domAnimation } from "motion/react";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: React.ReactNode;
}

function InitialWrapper({ children }: Props) {
  const { initialize: initializeCart } = useCartStore();
  const { initialize: initializeViewedProducts } = useViewedProductsStore();

  useEffect(() => {
    initializeCart();
    initializeViewedProducts();
  }, []);

  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/v3/?apikey=fe67c55a-458f-4bfc-805b-a1a37e125d50&lang=ru_RU"
        strategy="beforeInteractive"
      />
      <NextTopLoader color="#C49B48" showSpinner={false} />
      <Toaster
        position="top-center"
        duration={1260}
        toastOptions={{
          style: {
            pointerEvents: "none",
          },
        }}
      />
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </>
  );
}

export default InitialWrapper;
