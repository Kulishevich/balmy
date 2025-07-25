import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthT } from "./AuthorizationWindow";
import { noEmailScheme } from "@/utils/schemes/no-email";

type NoEmailFormT = {
  email: string;
};

type NoEmailFormProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
};

export const NoEmailForm = ({ setAuthState }: NoEmailFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoEmailFormT>({
    resolver: yupResolver(noEmailScheme),
  });

  const formHandler = handleSubmit((data) => {
    console.log(data);
    reset();
    setAuthState("not_partner");
  });

  return (
    <form onSubmit={formHandler} className="flex flex-col gap-6 items-center">
      <p className="text-[42px] font-bold text-center">
        Вы уже партнёр Balmy Pro, но ваш email не был зарегистрирован 😔{" "}
      </p>
      <p className="text-[14px] font-normal text-center">
        Пожалуйста, заполните поле ниже релевантным email-адресом
      </p>
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-normal cursor-pointer" htmlFor="email">
          Email*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["email"],
          })}
          id="email"
          type="email"
          placeholder="Введите ваш email"
          {...register("email")}
        />
        {errors["email"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["email"].message}
          </span>
        )}
      </div>
      <Action className="w-full" typeButton="submit">
        Войти
      </Action>
    </form>
  );
};
