import CloseIcon from "@/public/icons/close.svg";
import Image from "next/image";
import CountControl from "@/components/count-control";
import { CartProduct } from "@/types/product";
import { useCartStore } from "@/store/cart";
import cn from "clsx";

interface Props {
  cartProduct: CartProduct;
}

function CartProductCard({ cartProduct }: Props) {
  const { removeFromCart } = useCartStore();
  const { slug, name, image, price, discount, basePrice, discountPrices } =
    cartProduct;
  const alt = `фото товара ${name}`.toLowerCase();

  function handleClickOnRemoveFromCartButton() {
    removeFromCart(slug);
  }

  return (
    <div className="flex justify-between flex-col 2xl:grid grid-cols-[705px,1fr,1fr,1fr] items-center py-[30px] border-b border-b-dark-gray/30">
      <div className="flex items-center w-full">
        <button
          className="hidden bg-green w-[42px] h-[42px] sm:grid place-items-center rounded-full flex-shrink-0"
          onClick={handleClickOnRemoveFromCartButton}
        >
          <CloseIcon className="fill-white" />
          <span className="sr-only">Удалить тоавр из корзины</span>
        </button>
        <div className="max-w-[100px] lg:max-w-[200px] w-full sm:ml-[38px]">
          <div className="relative w-full aspect-square border border-green rounded-[5px] overflow-hidden">
            <Image
              className="object-contain"
              src={image || "/icons/logo-gray.svg"}
              alt={alt}
              fill
            />
            {!!discount && (
              <span className="absolute right-0 text-white py-[2px] px-[6px] sm:py-[6px] sm:px-3 bg-red font-semibold text-[15px] sm:text-[21px] rounded-[5px]">
                -{discount}%
              </span>
            )}
          </div>
          <button
            className="sm:hidden mt-[20px] text-dark-gray/50 border-b border-b-dark-gray/50"
            onClick={handleClickOnRemoveFromCartButton}
          >
            Удалить
          </button>
        </div>
        <div className="2xl:max-w-[312px] ml-4 sm:ml-[38px]">
          <span className="font-semibold">{name}</span>
          <div className="flex items-end gap-4 2xl:hidden">
            <CountControl
              className="mt-[10px] max-w-[104px] sm:max-w-[148px]"
              localCartProduct={cartProduct}
            />
            <div className="ml-4 flex flex-col">
              <span
                className={cn("sm:text-[24px] text-dark-gray/60 line-through", {
                  hidden: !discount,
                })}
              >
                {basePrice.toFixed(2)} byn
              </span>
              <span
                className={cn("sm:text-[24px]", { "text-red": !!discount })}
              >
                {discountPrices.toFixed(2)} byn
              </span>
            </div>
          </div>
        </div>
      </div>
      <CountControl
        className="max-w-[148px] hidden 2xl:flex"
        size="small"
        localCartProduct={cartProduct}
      />
      {!discount && (
        <span className="text-[24px] text-dark-gray/60 hidden 2xl:inline">
          {basePrice.toFixed(2)} byn
        </span>
      )}
      {!!discount && (
        <span className="text-[24px] hidden 2xl:inline-flex flex-col">
          <span className="opacity-50 line-through text-dark-gray/60">
            {basePrice.toFixed(2)} byn
          </span>
          <span className="text-red">{discountPrices.toFixed(2)} byn</span>
        </span>
      )}

      <span className="text-[24px] hidden 2xl:inline">
        {price.toFixed(2)} byn
      </span>
    </div>
  );
}

export default CartProductCard;
