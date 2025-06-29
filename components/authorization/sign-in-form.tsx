"use client";
import React from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/schemes/sign-in";
import clsx from "clsx";

type SignInForm = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: SignInForm) => {
    console.log(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[6px]">
        <label className="font-normal cursor-pointer" htmlFor="email">
          Email*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["email"],
          })}
          id="email"
          placeholder="Email"
          {...register("email")}
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
          id="password"
          placeholder="Пароль"
          {...register("password")}
        />
        {errors["password"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["password"].message}
          </span>
        )}
      </div>
      <Action className="mt-2" size="big" type="button" typeButton="submit">
        Войти
      </Action>
    </form>
  );
};
