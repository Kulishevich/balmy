"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import CallbackSectoin from "@/components/callback-section";
import ProductSlider from "@/components/product/slider";
import RecentlyViewedProductsSection from "@/components/recently-viewed-products-section";
import EcoFriendlyImage from "@/public/images/eco-friendly.webp";
import Title from "@/components/title";
import Image from "next/image";
import CountControl from "@/components/count-control";
import Action from "@/components/action";
import TabsSection from "@/components/product/tabs-section";
import { CartProduct, Product } from "@/types/product";
import { useViewedProductsStore } from "@/store/viewed-products";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { getCartProductFromProduct } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useBuyOneClickStore } from "@/store/buy-one-click";
import { usePopupStore } from "@/store/popup";
import cn from "clsx";
import { ISocailLinks } from "@/types/contacts";

interface Props {
  product: Product;
  similarProducts: Product[];
  socialLinks: ISocailLinks;
}

function ProductLayout({ product, similarProducts, socialLinks }: Props) {
  const [localCartProduct, setLocalCartProduct] = useState<CartProduct>(
    getCartProductFromProduct(product)
  );

  const router = useRouter();
  const { addToCart, getCartProduct } = useCartStore();
  const { setProduct } = useBuyOneClickStore();
  const { createPopup } = usePopupStore();
  const { addProduct } = useViewedProductsStore();
  const {
    name,
    images,
    brand,
    discount,
    price,
    description,
    sku,
    slug,
    quantity,
    country,
    // buy_price,
  } = product;

  const isDiscount = !!Number(discount);
  const discountPrices = (Number(price) * (100 - Number(discount))) / 100;

  const cartProduct = getCartProduct(slug!);

  function handleClickOnAddToCartButton() {
    if (cartProduct) {
      router.push("/cart");
      return;
    }

    addToCart(localCartProduct);
  }

  function handleClickOnBuyInOneClickButton() {
    setProduct(product);
    createPopup({ type: "buy-one-click" });
  }

  useEffect(() => {
    addProduct({
      image: !!images?.[0]?.image_path
        ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${images?.[0]?.image_path}`
        : "/icons/logo-gray.svg",
      slug: slug || "",
    });
  }, [addProduct, images, slug]);

  return (
    <>
      <Title type="h1" className="container mt-10 text-center">
        {name}
      </Title>
      <Breadcrumbs
        className="mt-4 mx-auto"
        dynamicPath={[
          {
            href: `/catalog/${product.category.slug}`,
            name: product.category.name,
          },
          {
            href: `/product/${slug}`,
            name,
          },
        ]}
      />
      <section
        className="container flex flex-col"
        itemScope
        itemType="http://schema.org/Product"
      >
        <meta itemProp="name" content={name} />
        <meta itemProp="description" content={description || "Товар"} />
        <meta itemProp="sku" content={sku} />
        {images?.map((img) => (
          <link key={img.id} itemProp="image" href={img.image_path} />
        ))}

        <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
          <link itemProp="url" href={`https://balmy.by/product/${slug}`} />
          <meta
            itemProp="availability"
            content={
              quantity
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock"
            }
          />
          <meta itemProp="priceCurrency" content="BYN" />
          <meta
            itemProp="price"
            content={(isDiscount ? discountPrices : +price).toFixed(2)}
          />
          <meta
            itemProp="itemCondition"
            content="https://schema.org/NewCondition"
          />
          <meta itemProp="priceValidUntil" content="2030-12-31" />
          <div
            itemProp="seller"
            itemScope
            itemType="http://schema.org/Organization"
          >
            <meta itemProp="name" content="ООО 'Коммерс Коннект'" />
          </div>
        </div>

        <div itemProp="brand" itemScope itemType="http://schema.org/Thing">
          <meta itemProp="name" content={brand?.name || "Без бренда"} />
        </div>

        <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row">
          <ProductSlider photos={images || []} />
          <div className="mt-[30px] lg:mt-0 lg:ml-[140px] flex flex-col w-full">
            <ul className="flex flex-col gap-y-[20px]">
              <li className="text-[21px]">
                Бренд:{" "}
                <span className="font-normal text-[17px]">{brand?.name}</span>
              </li>
              <li className="text-[21px]">
                Страна производитель:{" "}
                <span className="font-normal text-[17px]">{country}</span>
              </li>
              <li className="text-[21px]">
                Артикул: <span className="font-normal text-[17px]">{sku}</span>
              </li>
            </ul>
            <Image
              className="mt-[30px] object-contain max-w-[168px] lg:max-w-[266px]"
              src={EcoFriendlyImage}
              alt="эко"
            />

            <div className="flex flex-col gap-[6px] mt-[30px] sm:mt-[40px] items-center xl:items-start">
              <p className="text-[17px] text-center sm:text-left">
                Оптовая цена:
              </p>

              {!isDiscount && (
                <p className="text-[32px] font-quicksand sm:text-[40px] font-semibold text-center xl:text-left">
                  {price} byn
                </p>
              )}
              {!!isDiscount && (
                <div className="flex flex-col xl:flex-row gap-2 xl:gap-[14px] items-center xl:items-end">
                  <p className="sm:text-[40px] text-[32px] font-semibold text-center sm:text-left">
                    {discountPrices.toFixed(2)} byn
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="opacity-50 line-through text-[21px] font-semibold">
                      {price} byn
                    </p>
                    <p className="bg-red px-2 py-1 rounded-[4px]">
                      -{Number(discount)}%
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="flex flex-col gap-[6px] mt-[30px] sm:mt-[40px] opacity-50 items-center xl:items-start">
              <p className="text-[17px]">Розничная цена:</p>

              <span className="text-[32px] sm:text-[40px] font-semibold text-center sm:text-left">
                {buy_price} byn
              </span>
            </div> */}

            {!!quantity && (
              <div className="max-w-[660px] mt-[30px] grid grid-cols-2 2xl:flex gap-3">
                {!cartProduct && (
                  <CountControl
                    className="w-full col-span-1 2xl:col-span-1"
                    size="big"
                    localCartProduct={localCartProduct}
                    setLocalCartProduct={setLocalCartProduct}
                  />
                )}
                <Action
                  type="button"
                  className={cn("w-full col-span-1 2xl:col-span-1", {
                    "col-span-2": cartProduct,
                  })}
                  size="big"
                  color="gold"
                  onClick={handleClickOnAddToCartButton}
                >
                  {cartProduct ? "Уже в корзине" : "В корзину"}
                </Action>
                <Action
                  className="2xl:max-w-[216px] w-full col-span-2 2xl:col-span-1"
                  type="button"
                  size="big"
                  color="white"
                  onClick={handleClickOnBuyInOneClickButton}
                >
                  Купить в 1 клик
                </Action>
              </div>
            )}
            {!quantity && (
              <span className="mt-4 text-[32px] text-center sm:text-left sm:text-[40px] font-semibold opacity-50">
                Скоро в наличии
              </span>
            )}
            {description && (
              <>
                <p className="mt-12 sm:mt-[40px] text-[20px] font-semibold sm:font-medium sm:text-[26px] text-center sm:text-left">
                  Описание:
                </p>
                <div
                  className="mt-5 max-w-full text-center bg-white p-6 rounded-[5px]  sm:text-left break-words overflow-hidden [word-break:break-word] [&>*]:[overflow-wrap:anywhere] [&>*]:[word-break:break-word]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </>
            )}
          </div>
        </div>
      </section>
      <TabsSection similarProducts={similarProducts} />
      <RecentlyViewedProductsSection currentProductSlug={slug} />
      <CallbackSectoin socialLinks={socialLinks} />
    </>
  );
}

export default ProductLayout;
