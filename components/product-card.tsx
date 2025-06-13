"use client";
import Image from "next/image";
import Link from "next/link";
import Action from "@/components/action";
import CountControl from "@/components/count-control";
import { CartProduct, Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { getCartProductFromProduct } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBuyOneClickStore } from "@/store/buy-one-click";
import { usePopupStore } from "@/store/popup";
import { useScreenSize } from "@/hooks/use-screen-size";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { isTablet } = useScreenSize();
  const { addToCart, getCartProduct } = useCartStore();
  const { setProduct } = useBuyOneClickStore();
  const { createPopup } = usePopupStore();
  const router = useRouter();
  const [localCartProduct, setLocalCartProduct] = useState<CartProduct>(
    getCartProductFromProduct(product)
  );
  const {
    images,
    quantity,
    name,
    slug,
    salePrices,
    discount,
    discountPrices,
    description,
    brand,
  } = product;
  const cartProduct = getCartProduct(slug || "");

  const addToCartButtonText = cartProduct
    ? isTablet
      ? "В корзине"
      : "Уже в корзине"
    : "В корзину";

  function handleClickOnAddToCartButton() {
    if (cartProduct) {
      router.push("/cart");
      return;
    }

    addToCart(localCartProduct);
  }

  function handleClickOnBuyInOneClickButton() {
    if (product) {
      setProduct(product);
      createPopup({ type: "buy-one-click" });
    }
  }

  useEffect(() => {
    setLocalCartProduct(getCartProductFromProduct(product));
  }, [product]);

  if (!product) return <></>;

  return (
    <div
      className="lg:max-w-[300px] w-full flex flex-col items-center h-full group"
      itemScope
      itemType="http://schema.org/Product"
    >
      <meta itemProp="name" content={name} />
      <meta itemProp="description" content={description || ""} />
      <div itemProp="brand" itemScope itemType="http://schema.org/Brand">
        <meta itemProp="name" content={brand} />
      </div>

      <div className="relative max-w-[300px] w-full aspect-square border border-dark-gray rounded-[5px] overflow-hidden bg-white">
        <Link href={`/product/${slug}`} itemProp="url">
          <Image
            className="object-contain"
            src={images[0] || "/icons/logo-gray.svg"}
            alt={name}
            fill
            itemProp="image"
          />
          <meta itemProp="name" content={name} />
          <div className="transition opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/85 before:absolute before:inset-1 before:border-[2px] before:border-white before:rounded-[5px]">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[20px] font-normal">
              Подробнее
            </span>
          </div>
        </Link>
        {!!discount && (
          <span className="absolute right-0 text-white py-[6px] px-3 bg-red font-semibold sm:text-[21px] rounded-[5px]">
            -{discount}%
          </span>
        )}
        {!isTablet && !!quantity && (
          <Action
            type="button"
            className="absolute left-1/2 -translate-x-1/2 bottom-[20px] w-max transition opacity-0 group-hover:opacity-100"
            color="gray"
            size="small"
            onClick={handleClickOnBuyInOneClickButton}
          >
            Купить в 1 клик
          </Action>
        )}
      </div>

      <Link
        href={`/product/${slug}`}
        className="mt-3 text-[14px] lg:text-[17px] lg:mt-4 text-center font-normal line-clamp-3 lg:line-clamp-2"
      >
        <span itemProp="name">{name}</span>
      </Link>

      <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
        <meta itemProp="priceCurrency" content="BYN" />
        <meta
          itemProp="availability"
          content={
            quantity
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock"
          }
        />
        <meta
          itemProp="price"
          content={(discount ? discountPrices : salePrices).toFixed(2)}
        />
      </div>

      {!discount && (
        <span className="mt-auto pt-3 lg:pt-[20px] text-[20px] lg:text-[24px] font-quicksand font-semibold">
          {(salePrices * localCartProduct.quantity).toFixed(2)} byn
        </span>
      )}
      {!!discount && (
        <span className="mt-auto pt-3 lg:pt-[20px] font-quicksand font-semibold flex flex-col items-center">
          <span className="opacity-50 line-through">
            {(salePrices * localCartProduct.quantity).toFixed(2)} byn
          </span>
          <span className="text-[20px] lg:text-[24px]">
            {(discountPrices * localCartProduct.quantity).toFixed(2)} byn
          </span>
        </span>
      )}
      <div className="mt-4 flex justify-between w-full gap-[13px] transition">
        {!cartProduct && !isTablet && !!quantity && (
          <CountControl
            localCartProduct={localCartProduct}
            setLocalCartProduct={setLocalCartProduct}
          />
        )}
        {!!quantity && (
          <Action
            type="button"
            className="w-full transition-all"
            size="small"
            color="gold"
            onClick={handleClickOnAddToCartButton}
          >
            {addToCartButtonText}
          </Action>
        )}
        {!quantity && (
          <span className="h-[53.5px] grid place-items-center w-full text-[20px] font-semibold">
            Скоро в наличии
          </span>
        )}
      </div>
      {isTablet && !!quantity && (
        <Action
          type="button"
          className="mt-[6px] transition w-full"
          color="gray"
          size="small"
          onClick={handleClickOnBuyInOneClickButton}
        >
          Купить в 1 клик
        </Action>
      )}
    </div>
  );
}

export default ProductCard;
