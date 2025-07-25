import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRecoveryScheme } from "@/utils/schemes/password-recovery";
import { AuthT } from "./AuthorizationWindow";

type PasswordRecoveryForm = {
  phone: string;
};

type PasswordRecoveryProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
};

export const PasswordRecovery = ({ setAuthState }: PasswordRecoveryProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordRecoveryForm>({
    resolver: yupResolver(passwordRecoveryScheme),
  });

  const formHandler = handleSubmit((data) => {
    console.log(data);
    reset();
    setAuthState("not_partner");
  });

  return (
    <form onSubmit={formHandler} className="flex flex-col gap-6 items-center">
      <p className="text-[42px] font-bold">Восстановление доступа</p>
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-normal cursor-pointer" htmlFor="phone">
          Номер телефона*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["phone"],
          })}
          id="phone"
          type="phone"
          placeholder="Номер телефона*"
          {...register("phone")}
        />
        {errors["phone"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["phone"].message}
          </span>
        )}
      </div>
      <Action className="w-full" typeButton="submit">
        Восстановить доступ
      </Action>
    </form>
  );
};
