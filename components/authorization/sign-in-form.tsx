"use client";
import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/schemes/sign-in";
import clsx from "clsx";
import { LoginRequest } from "@/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { showToast } from "../toast";
import { normalizePhone } from "@/utils/helper";
import { AuthT } from "./AuthorizationWindow";

type SignInForm = {
  phone: string;
  password: string;
};

interface SignInFormProps {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
  authState: string;
}

export const SignInForm = ({ setAuthState, authState }: SignInFormProps) => {
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
    const normalPhone = normalizePhone(data.phone);

    try {
      const res = await LoginRequest({
        password: data.password,
        phone: normalPhone,
      });
      const token = `${res.data.token_type} ${res.data.token}`;

      // todo: change secure - true
      Cookies.set("token", token, { path: "/", secure: false });
      reset();
      showToast({
        title: "Успешный вход!",
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
    <>
      <div className="flex lg:gap-5 gap-3 justify-center">
        <button
          className={clsx("lg:text-[42px] text-[24px] transition-all ", {
            "opacity-100": authState == "sign_up",
            "opacity-20": authState == "log_in",
          })}
          onClick={() => setAuthState("sign_up")}
        >
          Регистрация
        </button>
        <button
          className={clsx("lg:text-[42px] text-[24px] transition-all ", {
            "opacity-100": authState == "log_in",
            "opacity-20": authState == "sign_up",
          })}
          onClick={() => setAuthState("log_in")}
        >
          /Вход
        </button>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[6px]">
          <label className="font-normal cursor-pointer" htmlFor="email">
            Номер телефона*
          </label>
          <input
            className={clsx("custom-input--dark mt-[6px] ", {
              "custom-input--dark-error": errors["phone"],
            })}
            id="phone"
            placeholder="Номер телефона"
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
        <div className="flex gap-[6px] text-dark-gray font-normal text-[14px]">
          <button
            type="button"
            className="opacity-50 hover:opacity-100"
            onClick={() => setAuthState("password_recovery")}
          >
            Получить пароль
          </button>
          <span className="opacity-50">/</span>
          <button
            type="button"
            className="opacity-50 hover:opacity-100"
            onClick={() => setAuthState("password_recovery")}
          >
            Забыли пароль?
          </button>
        </div>
        <Action size="big" type="button" typeButton="submit">
          Войти
        </Action>
      </form>
    </>
  );
};
