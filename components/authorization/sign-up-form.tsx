"use client";
import React from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { signUpSchema } from "@/utils/schemes/sign-up";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  "personal-info": boolean;
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

  const onSubmit = (data: SignUpForm) => {
    console.log(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[6px]">
        <label className={clsx("font-normal cursor-pointer")} htmlFor="name">
          ФИО
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["name"],
          })}
          id="name"
          placeholder="Введите ваше ФИО"
          {...register("name")}
        />

        {errors["name"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["name"].message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-[6px]">
        <label className="font-normal cursor-pointer" htmlFor="email">
          Email*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
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
        <label className="font-normal cursor-pointer" htmlFor="password">
          Пароль*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["password"],
          })}
          {...register("password")}
          id="password"
          placeholder="Придумайте пароль"
          type="password"
        />
        {errors["password"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["password"].message}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="custom-checkbox border border-[#1717174D]/20"
          id="date"
          type="checkbox"
          {...register("personal-info")}
        />
        <label
          className="font-normal lg:text-[17px] text-[14px]  cursor-pointer"
          htmlFor="date"
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
