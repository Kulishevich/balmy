"use client";
import Link from "next/link";
import BagIcon from "@/public/icons/bag.svg";
import BagMobileIcon from "@/public/icons/bag-mobile.svg";
import BagMobileLightIcon from "@/public/icons/bag-mobile-light.svg";
import cn from "clsx";
import { useCartStore } from "@/store/cart";
import { useScreenSize } from "@/hooks/use-screen-size";
import { getDeclensionForGoods } from "@/utils/helper";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { FREE_SHIPPING_PRICE, SHIPPING_PRICE } from "@/utils/constants";

interface Props {
  className?: string;
  mobileMenu?: boolean;
}

function CartInfo({ className, mobileMenu }: Props) {
  const { getCartTotal, getCartItemCount } = useCartStore();
  const { closeMobileMenu } = useMobileMenuStore();
  const { isTablet } = useScreenSize();
  const cartTotal = getCartTotal();
  const cartItemCount = getCartItemCount();
  const beforeFreeShipping = FREE_SHIPPING_PRICE - cartTotal;

  const totalPrice =
    beforeFreeShipping <= 0 ? cartTotal : cartTotal + SHIPPING_PRICE;

  if (mobileMenu) {
    return (
      <Link
        className="inline-flex items-end text-[21px] font-semibold gap-2 w-full"
        href="/cart"
        onClick={closeMobileMenu}
      >
        <div className="relative">
          <BagMobileLightIcon />
          <span className="text-xs font-semibold absolute top-0 right-0 font-quicksand bg-gold text-white w-[16px] h-[16px] rounded-full flex text-center">
            <span className="block mx-auto my-auto">{cartItemCount}</span>
          </span>
        </div>
        <span>Корзина</span>
      </Link>
    );
  }

  if (isTablet) {
    return (
      <Link className="relative" href="/cart">
        <BagMobileIcon />
        <span className="text-xs font-semibold absolute top-0 right-0 font-quicksand bg-gold text-white w-[16px] h-[16px] rounded-full flex text-center">
          <span className="block mx-auto my-auto">{cartItemCount}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link className={cn("flex items-center gap-2", className)} href="/cart">
      <div className="relative">
        <BagIcon />
        <span className="text-xs font-semibold absolute top-0 right-0 font-quicksand bg-gold text-white w-[18px] h-[18px] rounded-full flex text-center">
          <span className="block mx-auto my-auto">{cartItemCount}</span>
        </span>
      </div>
      <div className="hidden 2xl:flex flex-col">
        <span className="font-semibold">Корзина</span>
        <span className="text-[15px] text-wrap font-normal text-white/50">
          {cartItemCount} {getDeclensionForGoods(cartItemCount)} (
          {totalPrice.toFixed(2)} BYN)
        </span>
      </div>
    </Link>
  );
}

export default CartInfo;
