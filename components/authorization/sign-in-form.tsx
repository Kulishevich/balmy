"use client";
import React from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/schemes/sign-in";
import clsx from "clsx";
import { LoginRequest } from "@/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { showToast } from "../toast";

type SignInForm = {
  phone: string;
  password: string;
};

export const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      const res = await LoginRequest(data);
      const token = `${res.data.token_type} ${res.data.token}`;

      Cookies.set("token", token, { path: "/", secure: true });
      reset();
      showToast({
        title: "Спасибо за регистрацию!",
        description:
          "Ожидайте подтверждения регистрации на вашей почте, заявка должна быть одобрена менеджерами.",
        variant: "success",
      });
      router.push("/");
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
        <label className="font-normal cursor-pointer" htmlFor="email">
          Телефон
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["phone"],
          })}
          id="phone"
          placeholder="Телефон"
          {...register("phone")}
        />
        {errors["phone"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["phone"].message}
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
          type="password"
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
