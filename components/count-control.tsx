import { useCartStore } from "@/store/cart";
import { CartProduct } from "@/types/product";
import cn from "clsx";
import { Dispatch, SetStateAction } from "react";

interface Props {
  className?: string;
  size?: "small" | "big";
  localCartProduct: CartProduct;
  setLocalCartProduct?: Dispatch<SetStateAction<CartProduct>>;
}

function CountControl({
  className,
  size = "small",
  localCartProduct,
  setLocalCartProduct,
}: Props) {
  const { addQuantity, minusQuantity, getCartProduct } = useCartStore();
  const cartProduct = getCartProduct(localCartProduct.slug);

  function handleClickOnAddQuantityButton() {
    if (cartProduct) {
      addQuantity(cartProduct.slug);
    }

    if (setLocalCartProduct) {
      setLocalCartProduct({
        ...localCartProduct,
        quantity: localCartProduct.quantity + 1,
      });
    }
  }

  function handleClickOnMinusQuantityButton() {
    if (cartProduct) {
      minusQuantity(cartProduct.slug);
    }

    if (setLocalCartProduct) {
      setLocalCartProduct({
        ...localCartProduct,
        quantity: Math.max(1, localCartProduct.quantity - 1),
      });
    }
  }

  return (
    <div
      className={cn(
        "font-quicksand flex justify-between items-center gap-2 border border-light-green rounded-[5px]",
        { "text-[21px]": size == "small", "text-[30px]": size == "big" },
        className,
      )}
    >
      <button
        className={cn({
          "px-[13px] py-[10px]": size == "small",
          "px-[20px] py-[13.5px]": size == "big",
        })}
        onClick={handleClickOnMinusQuantityButton}
      >
        -
      </button>
      <span className="inline-block w-8 text-center cursor-default">
        {cartProduct?.quantity || localCartProduct.quantity}
      </span>
      <button
        className={cn({
          "px-[13px] py-[10px]": size == "small",
          "px-[20px] py-[13.5px]": size == "big",
        })}
        onClick={handleClickOnAddQuantityButton}
      >
        +
      </button>
    </div>
  );
}

export default CountControl;
