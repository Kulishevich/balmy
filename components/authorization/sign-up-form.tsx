"use client";
import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { signUpSchema } from "@/utils/schemes/sign-up";
import { showToast } from "../toast";
import { CreateClientRequest } from "@/api/auth";
import { normalizePhone } from "@/utils/helper";
import { AuthT } from "./AuthorizationWindow";

type SignUpForm = {
  fullName: string;
  phone: string;
  comment: string;
  "personal-info": boolean;
  email: string;
};

interface SignUpFormProps {
  authState: string;
  setAuthState: Dispatch<SetStateAction<AuthT>>;
}

export const SignUpForm = ({ setAuthState, authState }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  const personalInfo = watch("personal-info");

  const onSubmit = async (data: SignUpForm) => {
    const phone = normalizePhone(data.phone);

    try {
      await CreateClientRequest({
        phone: phone,
        comment: data.comment,
        full_name: data.fullName,
        email: data.email,
      });

      showToast({
        title: "Спасибо за регистрацию!",
        description:
          "Ожидайте подтверждения регистрации на вашей почте, заявка должна быть одобрена менеджерами.",
        variant: "success",
      });
      reset();
    } catch (err) {
      console.log(err);
      showToast({
        title: "Произошла ошибка",
        description: "Пожалуйста, повторите попытку ещё раз.",
        variant: "error",
      });
    }
  };

  return (
    <>
      <div className="flex lg:gap-5 gap-3 justify-center">
        <button
          className={clsx("lg:text-[42px] text-[24px] ", {
            "opacity-100": authState == "sign_up",
            "opacity-20": authState == "log_in",
          })}
          onClick={() => setAuthState("sign_up")}
        >
          Регистрация
        </button>
        <button
          className={clsx("lg:text-[42px] text-[24px] ", {
            "opacity-100": authState == "log_in",
            "opacity-20": authState == "sign_up",
          })}
          onClick={() => setAuthState("log_in")}
        >
          /Вход
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[6px]">
          <label className={clsx("font-normal cursor-pointer")} htmlFor="name">
            ФИО
          </label>
          <input
            className={clsx("custom-input--dark mt-[6px] ", {
              "custom-input--dark-error": errors["fullName"],
            })}
            id="name"
            placeholder="Введите ваше ФИО"
            {...register("fullName")}
          />

          {errors["fullName"] && (
            <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
              *{errors["fullName"].message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="font-normal cursor-pointer" htmlFor="phone">
            Телефон
          </label>
          <input
            className={clsx("custom-input--dark mt-[6px]", {
              "custom-input--dark-error": errors["phone"],
            })}
            {...register("phone")}
            id="phone"
            placeholder="Введите ваш телефон"
          />
          {errors["phone"] && (
            <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
              *{errors["phone"].message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="font-normal cursor-pointer" htmlFor="email">
            Email
          </label>
          <input
            className={clsx("custom-input--dark mt-[6px]", {
              "custom-input--dark-error": errors["email"],
            })}
            {...register("email")}
            id="email"
            placeholder="Введите ваш email"
          />
          {errors["email"] && (
            <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
              *{errors["email"].message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="font-normal cursor-pointer" htmlFor="comment">
            Ваша должность
          </label>
          <input
            className={clsx("custom-input--dark mt-[6px]", {
              "custom-input--dark-error": errors["comment"],
            })}
            id="comment"
            placeholder="Барбер, Владелец барбершопа, Салон"
            {...register("comment")}
          />
          {errors["comment"] && (
            <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
              *{errors["comment"].message}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox border border-[#1717174D]/20"
            id="personal-info"
            type="checkbox"
            {...register("personal-info")}
          />
          <label
            className="font-normal lg:text-[17px] text-[14px]  cursor-pointer"
            htmlFor="personal-info"
          >
            Согласие на обработку персональных данных
          </label>
        </div>
        <Action
          className="mt-2"
          size="big"
          type="button"
          typeButton="submit"
          disabled={!personalInfo}
        >
          Зарегистрироваться
        </Action>
      </form>
    </>
  );
};
