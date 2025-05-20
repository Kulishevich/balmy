"use client";
import { useState } from "react";
import cn from "clsx";
import ProductCard from "../product-card";
import { Product } from "@/types/product";
import { useScreenSize } from "@/hooks/use-screen-size";
import Title from "../title";

interface Props {
  similarProducts: Product[];
}

const tabs = ["Похожие товары"];

function TabsSection({ similarProducts }: Props) {
  const [activeTabIdx] = useState(0);
  const { isMobile } = useScreenSize();

  return (
    <section className="mt-[72px] lg:mt-[120px] container">
      {!isMobile && (
        <div className="flex gap-[30px]">
          {tabs.map((tab, idx) => {
            const isActive = idx == activeTabIdx;

            return (
              <button
                className={cn("text-[26px]", {
                  "text-dark-gray": isActive,
                  "text-dark-gray/50": !isActive,
                })}
                key={idx}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}
      {isMobile && (
        <Title type="h2" className="text-center">
          Похожие товары
        </Title>
      )}
      {tabs[activeTabIdx] == "Похожие товары" && (
        <div className="mt-6 sm:mt-[40px] gap-[30px] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 overflow-x-auto scrollbar-hide">
          {similarProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}
    </section>
  );
}

export default TabsSection;
