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
import { getMaxBonusPoints } from "@/api/orders";
import Cookies from "js-cookie";

function CartPage() {
  const token = Cookies.get("token") || "";
  const [maxBonusPoints, setMaxBonusPoints] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUseBonuses, setIsUseBonuses] = useState<boolean>(false);

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
  const addedBonuses = (cartTotal * 0.03).toFixed(2);

  const totalPrice =
    beforeFreeShipping <= 0 ? cartTotal : cartTotal + SHIPPING_PRICE;

  useEffect(() => {
    async function handleFetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }

    handleFetchCategories();
  }, []);

  useEffect(() => {
    const getMaxBonuses = async () => {
      try {
        const res = await getMaxBonusPoints({
          order_amount: 1000,
          token,
        });
        if (res?.data.max_bonus_points) {
          setMaxBonusPoints(res?.data.max_bonus_points);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMaxBonuses();
  }, [cartTotal, token]);

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
                className="sm:text-[21px] text-white/50 underline border-b border-b-dark-gray/50"
                onClick={clearCart}
              >
                Очистить корзину
              </button>
              <div className="mt-[30px] sm:mt-0 flex flex-col gap-[30px] sm:max-w-[336px] w-full sm:text-[26px] font-normal">
                <span className="flex text-red">
                  Cкидка:{" "}
                  <span className="ml-auto">
                    {cartTotalDiscount.toFixed(2)} byn
                  </span>
                </span>

                <div className="flex flex-col">
                  <div className="flex mb-6">
                    <p className="max-w-[169px]">Бонусные баллы:</p>{" "}
                    <p className="ml-auto">{maxBonusPoints} byn</p>
                  </div>
                  <div className="flex items-center gap-2 mb-[10px]">
                    <input
                      className="custom-checkbox border border-[#FFFFFF4D]/20"
                      id="bonuses"
                      type="checkbox"
                      checked={isUseBonuses}
                      onChange={(e) => setIsUseBonuses(e.target.checked)}
                    />
                    <label
                      className="font-normal lg:text-[17px] text-[14px]  cursor-pointer"
                      htmlFor="bonuses"
                    >
                      Списать бонусные баллы (списать можно до 30% от суммы
                      заказа)
                    </label>
                  </div>
                  <m.span
                    className=" text-[17px] text-[#FFFFFF80]"
                    {...appearanceAnimation}
                  >
                    (за эту покупку начислится {addedBonuses} byn баллов)
                  </m.span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <m.span className="flex" {...appearanceAnimation}>
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
                      className=" text-[17px] text-[#FFFFFF80]"
                      {...appearanceAnimation}
                    >
                      (до бесплатной доставки ещё{" "}
                      {beforeFreeShipping.toFixed(2)} byn!)
                    </m.span>
                  )}
                </div>

                <span className=" flex font-bold">
                  Итого:{" "}
                  <span className="ml-auto">{totalPrice.toFixed(2)} byn</span>
                </span>
              </div>
            </div>
            <Action
              type="link"
              href={`/cart/delivery-payment?use_bonuses=${isUseBonuses}`}
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
