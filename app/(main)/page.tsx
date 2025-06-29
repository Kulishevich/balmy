import { getBanners } from "@/api/banners";
import { getBrands } from "@/api/brands";
import { getContacts } from "@/api/contacts";
import CallbackSectoin from "@/components/callback-section";
import BrandsSection from "@/components/home/brands-section";
import MainSection from "@/components/home/main-section";
import OurCatalogSection from "@/components/home/our-catalog-section";
import PopularProductsSection from "@/components/home/popular-products-section";
import SetSection from "@/components/home/set-section";

async function HomePage() {
  const brands = await getBrands();
  const banners = await getBanners();
  const { social_links } = await getContacts();

  return (
    <>
      <MainSection />
      <PopularProductsSection />
      <SetSection banners={banners} />
      <OurCatalogSection />
      <BrandsSection brands={brands || []} />
      <CallbackSectoin socialLinks={social_links} />
    </>
  );
}

export default HomePage;
