import Title from "@/components/title";
import PopularProductsSlider from "./popular-products-slider";
import { getPopularProducts } from "@/api/products";

async function PopularProductsSection() {
  const popularProducts = await getPopularProducts();

  return (
    !!popularProducts.length && (
      <section className="container mb-[89px]">
        <Title className="text-center">Популярные товары</Title>
        <PopularProductsSlider popularProducts={popularProducts} />
      </section>
    )
  );
}

export default PopularProductsSection;
