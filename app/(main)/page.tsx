import { getBrands } from "@/api/brands";
import { getSales } from "@/api/sales";
import CallbackSectoin from "@/components/callback-section";
import BrandsSection from "@/components/home/brands-section";
import MainSection from "@/components/home/main-section";
import OurCatalogSection from "@/components/home/our-catalog-section";
import PopularProductsSection from "@/components/home/popular-products-section";
import SetSection from "@/components/home/set-section";

async function HomePage() {
  const { sales } = await getSales();
  const brands = await getBrands();

  return (
    <>
      <MainSection />
      <PopularProductsSection />
      <SetSection sets={sales} />
      <OurCatalogSection />
      <BrandsSection brands={brands} />
      <CallbackSectoin />
    </>
  );
}

export default HomePage;
