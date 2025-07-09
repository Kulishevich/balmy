"use client";
import React from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { signUpSchema } from "@/utils/schemes/sign-up";
import { showToast } from "../toast";
import { CreateClientRequest } from "@/api/auth";
import { normalizePhone } from "@/utils/helper";

type SignUpForm = {
  fullName: string;
  phone: string;
  comment?: string;
  "personal-info": boolean;
  email: string;
};

export const SignUpForm = () => {
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
        comment: data.comment || "",
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
          placeholder="Введите ваш телефон"
        />
        {errors["email"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["email"].message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-[6px]">
        <label className="font-normal cursor-pointer" htmlFor="comment">
          Комментарий
        </label>
        <textarea
          className={clsx("custom-input--dark mt-[6px] h-[100px] resize-none", {
            "custom-input--dark-error": errors["comment"],
          })}
          id="comment"
          placeholder="Комментарий"
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
  );
};
