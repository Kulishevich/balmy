import Action from "../action";
import { m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import RecentlyViewedProductsSection from "../recently-viewed-products-section";

interface Props {
  firstCategorySlug: string;
}

function CartIsEmpty({ firstCategorySlug }: Props) {
  if (!firstCategorySlug) return <></>;

  return (
    <>
      <m.div
        className="container flex flex-col items-center my-auto pt-[72px] lg:pt-[120px] max-w-[824px] mx-auto"
        {...appearanceAnimation}
      >
        <p className="text-center text-[18px] lg:text-[26px]">
          Ваша корзина пуста. Добавьте профессиональную косметику для ухода за
          собой и создайте идеальный образ.
        </p>
        <Action
          type="link"
          href={`/catalog/${firstCategorySlug}`}
          className="mt-8 max-w-[300px] w-full"
          size="big"
          color="green"
        >
          Перейти в каталог
        </Action>
      </m.div>
      <RecentlyViewedProductsSection />
    </>
  );
}

export default CartIsEmpty;
