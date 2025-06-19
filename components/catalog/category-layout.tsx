import CallbackSectoin from "@/components/callback-section";
import CatalogFilter from "@/components/catalog/filter";
import CatalogHeader from "@/components/catalog/header";
import Subcategories from "@/components/catalog/subcategories";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import RecentlyViewedProductsSection from "@/components/recently-viewed-products-section";
import { Product } from "@/types/product";
import React from "react";
import FilterHeader from "./filter-header";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
// import DeodorantDescription from "../descriptions/deodorant-description";
// import VoskDlyaUsovDescription from "../descriptions/vosk-dlya-usov-description";
// import RascheskiDlyaVolosDescription from "../descriptions/rascheski-dlya-volos-description";
// import PomadyDlyaUkladkiVolos from "../descriptions/pomady-dlya-ukladki-volos-description";
// import BalzamyDescription from "../descriptions/balzamy-description";
// import GelDlyaDushaDescription from "../descriptions/gel-dlya-dusha-description";
// import MasloDlyaBorodyDescription from "../descriptions/maslo-dlya-borody-description";
// import ShampuniDescription from "../descriptions/shampuni-description";
// import ShampuniDlyaVolosDescription from "../descriptions/shampuni-dlya-volos-description";
// import OpasnyeBritvyDescription from "../descriptions/opasnye-britvy-description";
// import LosonyPosleBrityaDescription from "../descriptions/losony-posle-britya-description";
// import BalzamPosleBrityaDescription from "../descriptions/balzam-posle-britya-description";

// const descriptionComponents: Record<string, React.ReactNode> = {
//   deodorant: <DeodorantDescription />,
//   "vosk-dlya-usov": <VoskDlyaUsovDescription />,
//   "rascheski-dlya-volos": <RascheskiDlyaVolosDescription />,
//   "pomady-dlya-ukladki-volos": <PomadyDlyaUkladkiVolos />,
//   balzamy: <BalzamyDescription />,
//   "gel-dlya-dusha": <GelDlyaDushaDescription />,
//   "maslo-dlya-borody": <MasloDlyaBorodyDescription />,
//   shampuni: <ShampuniDescription />,
//   "balzam-posle-britya": <BalzamPosleBrityaDescription />,
//   "shampuni-dlya-volos": <ShampuniDlyaVolosDescription />,
//   "opasnye-britvy": <OpasnyeBritvyDescription />,
//   "losony-posle-britya": <LosonyPosleBrityaDescription />,
// };

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories?: Brand[] };
  subcategory?: Category | Brand;
  products: Product[];
  totalPages: number;
  page: string;
  brands: Brand[];
}

function CategoryLayout({
  subcategory,
  category,
  products,
  totalPages,
  page,
  brands,
}: Props) {
  console.log(category);

  return (
    <>
      <CatalogHeader category={category} subcategory={subcategory} />
      <FilterHeader totalPages={+totalPages} countProducts={products.length} />
      <section className="mt-10 container flex flex-col">
        <Subcategories category={category} subcategory={subcategory} />
        <div className="relative flex items-start lg:mt-10">
          <CatalogFilter
            className="hidden 2xl:block min-[1921px]:absolute min-[1921px]:left-0 min-[1921px]:-translate-x-[calc(100%+40px)] min-[1921px]:top-0"
            page={page}
            brands={brands}
            showBrands={category.slug === "brands"}
          />
          {!!products.length && (
            <div className="mx-auto 2xl:ml-auto relative grid grid-cols-2 sm:grid-cols-3 min-[1921px]:grid-cols-4 gap-x-4 sm:gap-x-[30px] gap-y-9 sm:gap-y-[40px]">
              {products?.map((product, idx) => {
                return <ProductCard key={idx} product={product} />;
              })}
            </div>
          )}
          {!products.length && (
            <p className="text-[21px] leading-[29px] text-center w-full">
              Товар не найден :(
            </p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} />
      </section>
      <RecentlyViewedProductsSection />
      <CallbackSectoin />
    </>
  );
}

export default CategoryLayout;
