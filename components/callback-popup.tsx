"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePopupStore } from "@/store/popup";
import { m } from "motion/react";
import Title from "@/components/title";
import CloseIcon from "@/public/icons/close.svg";
import Action from "./action";
import { popupAnimation } from "@/utils/animations";
import { callbackSchema } from "@/utils/schemes/callback";
import { createCallbackMessage, sendMessageToTelegram } from "@/api/telegram";
import cn from "clsx";
import { toast } from "sonner";
import Link from "next/link";

export type CallbackInputs = {
  phone: string;
  comment: string;
  "personal-info": boolean;
};

function CallbackPopup() {
  const { removePopup } = usePopupStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CallbackInputs>({
    resolver: yupResolver(callbackSchema),
  });
  const personalInfo = watch("personal-info");

  function resetFormFields() {
    setValue("phone", "");
    setValue("comment", "");
    setValue("personal-info", false);
  }

  function handleClickOnCloseButton() {
    removePopup();
  }

  async function onSubmit(callbackData: CallbackInputs) {
    const message = createCallbackMessage(callbackData);
    await sendMessageToTelegram(message);
    resetFormFields();

    toast.success("Сообщение отправлено");
  }

  return (
    <m.div
      {...popupAnimation}
      className="fixed z-20 max-w-[640px] lg:max-w-[850px] w-full rounded-[5px] lg:overflow-hidden bg-dark-grey h-svh overflow-y-scroll sm:h-auto"
    >
      <div className="h-[87px] lg:h-[194px] w-full bg-[url('/images/beard-cut.webp')] bg-cover bg-center bg-no-repeat"></div>
      <div className="bg-dark-grey w-full flex flex-col items-center pt-4 lg:pt-6 pb-8 lg:pb-12 px-[18px] lg:px-0">
        <Title>Обратный звонок</Title>
        <form
          className="mt-4 lg:mt-6 w-full max-w-[632px] flex flex-col min-h-[calc(100svh-193px)] sm:min-h-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-[21px]" htmlFor="phone">
              Телефон
            </label>
            <input
              className={cn("custom-input mt-[6px]", {
                "custom-input--error": errors["phone"],
              })}
              id="phone"
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
            <label className="text-[21px]" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              className={cn("custom-textarea mt-[6px]", {
                "custom-textarea--error": errors["comment"],
              })}
              id="comment"
              placeholder="Комментарий"
              {...register("comment")}
            />
            {errors["comment"] && (
              <span className="mt-2 text-[#EB001B] text-[15px]">
                *{errors["comment"].message}
              </span>
            )}
          </div>
          <div className="pt-4 mt-auto flex items-center gap-2">
            <input
              className="custom-checkbox border-white/30"
              id="personal-data-2"
              type="checkbox"
              {...register("personal-info")}
            />
            <label
              className="font-normal cursor-pointer"
              htmlFor="personal-data-2"
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
            typeButton="submit"
            disabled={!personalInfo}
            color="white"
          >
            Отправить
          </Action>
        </form>
        <button
          className="absolute top-6 right-6 bg-dark-gray w-[42px] h-[42px] grid place-items-center rounded-full"
          onClick={handleClickOnCloseButton}
        >
          <CloseIcon className="fill-white" />
          <span className="sr-only">закрыть popup</span>
        </button>
      </div>
    </m.div>
  );
}

export default CallbackPopup;
