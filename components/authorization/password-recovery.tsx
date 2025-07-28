import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRecoveryScheme } from "@/utils/schemes/password-recovery";
import { AuthT } from "./AuthorizationWindow";
import { forgotPassword } from "@/api/auth";
import { normalizePhone } from "@/utils/helper";

type PasswordRecoveryForm = {
  phone: string;
};

type PasswordRecoveryProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
  setPhone: Dispatch<SetStateAction<string | null>>;
};

export const PasswordRecovery = ({
  setAuthState,
  setEmail,
  setPhone,
}: PasswordRecoveryProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordRecoveryForm>({
    resolver: yupResolver(passwordRecoveryScheme),
  });

  const formHandler = handleSubmit(async (data) => {
    const phone = normalizePhone(data.phone);

    try {
      const res = await forgotPassword(data);

      if (res.success) {
        setEmail(res.email || "");
        setPhone(phone);

        setAuthState("last_step");
      } else if (!res.success && res.require_email) {
        setPhone(phone);

        setAuthState("no_email");
      } else {
        setAuthState("not_partner");
      }
    } catch (err) {
      setAuthState("not_partner");
      console.log(err);
    } finally {
      reset();
    }
  });

  return (
    <form
      onSubmit={formHandler}
      className="flex flex-col gap-5 items-center lg:gap-6"
    >
      <p className="text-[24px] lg:text-[42px] font-bold text-center">
        Восстановление доступа
      </p>
      <div className="flex flex-col gap-[6px] w-full">
        <label
          className="text-[17px] lg:text-[21px]  font-normal cursor-pointer"
          htmlFor="phone"
        >
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
      <Action className="w-full text-[19px] lg:text-[21px]" typeButton="submit">
        Восстановить доступ
      </Action>
    </form>
  );
};
