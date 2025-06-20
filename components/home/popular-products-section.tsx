import Title from "@/components/title";
import PopularProductsSlider from "./popular-products-slider";
import { getPopularProducts } from "@/api/products";

async function PopularProductsSection() {
  const popularProducts = await getPopularProducts();

  return (
    <section className="mt-[796px] lg:mt-[194px] container">
      <Title className="text-center">Популярные товары</Title>
      <PopularProductsSlider popularProducts={popularProducts} />
    </section>
  );
}

export default PopularProductsSection;
