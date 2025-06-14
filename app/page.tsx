import { getSales } from "@/api/sales";
import CallbackSectoin from "@/components/callback-section";
import BrandsSection from "@/components/home/brands-section";
// import CooperationSection from "@/components/home/cooperation-section";
import FreeShippingSection from "@/components/home/free-shipping-section";
import MainSection from "@/components/home/main-section";
// import OurAdavantagesSection from "@/components/home/our-advantages-section";
import OurCatalogSection from "@/components/home/our-catalog-section";
import PopularProductsSection from "@/components/home/popular-products-section";
import SetSection from "@/components/home/set-section";

async function HomePage() {
  const { sales } = await getSales();

  return (
    <>
      <MainSection />
      <PopularProductsSection />
      <SetSection sets={sales} />
      <OurCatalogSection />
      <FreeShippingSection />
      <BrandsSection />
      {/* <OurAdavantagesSection /> */}
      {/* <CooperationSection /> */}
      <CallbackSectoin />
    </>
  );
}

export default HomePage;
