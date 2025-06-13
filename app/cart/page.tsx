"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import CartProductCard from "@/components/cart/product-card";
import Action from "@/components/action";
import { useCartStore } from "@/store/cart";
import { FREE_SHIPPING_PRICE, SHIPPING_PRICE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/api/category";
import CartIsEmpty from "@/components/cart/is-empty";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";

function CartPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    cart,
    getCartTotal,
    getCartTotalDiscount,
    getCartItemCount,
    clearCart,
  } = useCartStore();
  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();
  const cartTotalDiscount = getCartTotalDiscount();
  const beforeFreeShipping = FREE_SHIPPING_PRICE - cartTotal;

  useEffect(() => {
    async function handleFetchCategories() {
      const { categories } = await getCategories();
      setCategories(categories);
    }

    handleFetchCategories();
  }, []);

  return (
    <>
      <Title className="mt-10 text-center">Корзина</Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <AnimatePresence>
        {cartItemCount ? (
          <m.section
            className="container flex flex-col"
            {...appearanceAnimation}
          >
            <div className="hidden mt-5 py-5 2xl:grid grid-cols-[705px,1fr,1fr,1fr] border-b border-b-white/30 text-[21px] text-white/60">
              <span className="pl-20">Наименование товара</span>
              <span>Количество</span>
              <span>Цена за шт.</span>
              <span>Всего</span>
            </div>
            <div className="transition-all">
              {cart.map((cartProduct) => {
                return (
                  <CartProductCard
                    key={cartProduct.slug}
                    cartProduct={cartProduct}
                  />
                );
              })}
            </div>
            <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row justify-between items-start">
              <button
                className="sm:text-[21px] text-dark-gray/50 border-b border-b-dark-gray/50"
                onClick={clearCart}
              >
                Очистить корзину
              </button>
              <div className="mt-[30px] sm:mt-0 flex flex-col sm:max-w-[336px] w-full sm:text-[26px] font-normal">
                <span className="flex text-red">
                  Cкидка:{" "}
                  <span className="ml-auto">
                    {cartTotalDiscount.toFixed(2)} byn
                  </span>
                </span>
                <m.span className="mt-[30px] flex" {...appearanceAnimation}>
                  Доставка:
                  {beforeFreeShipping <= 0 ? (
                    <span className="ml-auto">Бесплатно</span>
                  ) : (
                    <span className="ml-auto">
                      {SHIPPING_PRICE.toFixed(2)} byn
                    </span>
                  )}
                </m.span>
                {beforeFreeShipping > 0 && (
                  <m.span
                    className="mt-[30px] text-[17px] opacity-50"
                    {...appearanceAnimation}
                  >
                    (до бесплатной доставки ещё {beforeFreeShipping.toFixed(2)}{" "}
                    byn!)
                  </m.span>
                )}
                <span className="mt-[30px] flex font-bold">
                  Итого:{" "}
                  <span className="ml-auto">{cartTotal.toFixed(2)} byn</span>
                </span>
              </div>
            </div>
            <Action
              type="link"
              href="/cart/delivery-payment"
              className="mt-10"
              size="big"
              color="white"
            >
              Перейти к доставке и оплате
            </Action>
          </m.section>
        ) : (
          <CartIsEmpty firstCategorySlug={categories[1]?.slug} />
        )}
      </AnimatePresence>
    </>
  );
}

export default CartPage;
