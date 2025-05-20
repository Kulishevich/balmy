import { m } from "motion/react";
import Action from "./action";
import { useBuyOneClickStore } from "@/store/buy-one-click";
import { leftAppearanceAnimation } from "@/utils/animations";
import CloseIcon from "@/public/icons/close.svg";
import Image from "next/image";
import cn from "clsx";
import { usePopupStore } from "@/store/popup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { buyOneClickSchema } from "@/utils/schemes/buy-one-click";
import {
  createBuyOneClickMessage,
  sendMessageToTelegram,
} from "@/api/telegram";
import { toast } from "sonner";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";

export type BuyOneClickInputs = {
  name: string;
  phone: string;
  comment?: string;
  "personal-info": boolean;
};

function BuyOneClickPopup() {
  const { product } = useBuyOneClickStore();
  const { removePopup } = usePopupStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BuyOneClickInputs>({
    resolver: yupResolver(buyOneClickSchema),
  });
  const swipeHandlers = useSwipeable({
    onSwipedRight: removePopup,
    trackTouch: true,
  });
  const personalInfo = watch("personal-info");

  function resetFormFields() {
    setValue("name", "");
    setValue("phone", "");
    setValue("comment", "");
    setValue("personal-info", false);
  }

  async function onSubmit(buyOneClickData: BuyOneClickInputs) {
    const message = createBuyOneClickMessage({
      buyOneClickData,
      product: product!,
    });
    await sendMessageToTelegram(message);

    resetFormFields();
    removePopup();

    toast.success("Сообщение отправлено");
  }

  return (
    <m.div
      className="fixed z-20 sm:max-w-[425px] right-0 inset-y-0 w-full min-h-svh overflow-scroll sm:overflow-hidden bg-white py-4 sm:py-10 px-6 sm:px-8 flex flex-col"
      {...leftAppearanceAnimation}
      {...swipeHandlers}
    >
      <div className="flex gap-6 sm:mx-auto">
        <button className="sm:hidden" onClick={removePopup}>
          <CloseIcon className="fill-black" />
        </button>
        <h3 className="text-center font-bold text-[28px] sm:text-[30px]">
          Купить в 1 клик
        </h3>
      </div>
      <div className="mt-5 sm:mt-[30px] flex items-start gap-3">
        <div className="relative max-w-20 w-full h-20 border border-dark-gray rounded-[5px] overflow-hidden">
          <Image
            className="object-contain"
            src={product?.images[0] || "/icons/logo-gray.svg"}
            alt={product?.name.toLowerCase() || "продукт"}
            fill
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>{product?.name}</span>
          <span className="text-[15px] font-bold inline-flex gap-[6px]">
            <span
              className={cn({ "opacity-50 line-through": !!product?.discount })}
            >
              {product?.salePrices.toFixed(2)} byn
            </span>
            {!!product?.discount && product.discountPrices.toFixed(2) + " byn"}
          </span>
        </div>
      </div>
      <form
        className="mt-5 sm:mt-[30px] h-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-[21px]" htmlFor="name">
            Имя
          </label>
          <input
            className={cn("custom-input mt-[6px]", {
              "custom-input--error": errors["name"],
            })}
            id="name"
            placeholder="Введите ваше имя"
            {...register("name")}
          />
          {errors["name"] && (
            <span className="mt-2 text-[#EB001B] text-[15px]">
              *{errors["name"].message}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label className="text-[21px]" htmlFor="phone-2">
            Телефон
          </label>
          <input
            className={cn("custom-input mt-[6px]", {
              "custom-input--error": errors["phone"],
            })}
            id="phone-2"
            placeholder="+ 375 (___) ___-__-__"
            {...register("phone")}
          />
          {errors["phone"] && (
            <span className="mt-2 text-[#EB001B] text-[15px]">
              *{errors["phone"].message}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label className="text-[21px]" htmlFor="comment-2">
            Комментарий
          </label>
          <textarea
            className="custom-textarea mt-[6px]"
            id="comment-2"
            placeholder="Комментарий"
            {...register("comment")}
          />
        </div>
        <div className="pt-4 mt-auto flex items-center gap-2">
          <input
            className="custom-checkbox"
            id="personal-data-3"
            type="checkbox"
            {...register("personal-info")}
          />
          <label
            className="font-normal cursor-pointer"
            htmlFor="personal-data-3"
          >
            <Link
              href={"/privacy-policy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Согласие на обработку персональных данных
            </Link>
          </label>
        </div>
        <Action
          type="button"
          className="mt-6 w-full"
          size="big"
          color="dark-gray"
          typeButton="submit"
          disabled={!personalInfo}
        >
          Заказать
        </Action>
      </form>
    </m.div>
  );
}

export default BuyOneClickPopup;
