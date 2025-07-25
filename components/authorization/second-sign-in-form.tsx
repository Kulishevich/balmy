import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthT } from "./AuthorizationWindow";
import { secondSignInScheme } from "@/utils/schemes/second-sign-in";

type SecondSignInFormT = {
  password: string;
};

type SecondSignInFormProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
};

export const SecondSignInForm = ({ setAuthState }: SecondSignInFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecondSignInFormT>({
    resolver: yupResolver(secondSignInScheme),
  });

  const formHandler = handleSubmit((data) => {
    console.log(data);
    reset();
    setAuthState("no_email");
  });

  return (
    <form onSubmit={formHandler} className="flex flex-col gap-6 items-center">
      <p className="text-[42px] font-bold">Вход на сайт</p>
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-normal cursor-pointer" htmlFor="password">
          Пароль из email*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["password"],
          })}
          id="password"
          type="password"
          placeholder="Пароль из email"
          {...register("password")}
        />
        {errors["password"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["password"].message}
          </span>
        )}
      </div>
      <Action className="w-full" typeButton="submit">
        Войти
      </Action>
    </form>
  );
};
