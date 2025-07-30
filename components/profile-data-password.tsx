"use client";
import { changePassword } from "@/api/auth";
import { changePasswordSchema } from "@/utils/schemes/change-password";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { showToast } from "./toast";

interface ChangePasswordForm {
  new_password: string;
}

export const ChangePasswordForm = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
    reValidateMode: "onSubmit",
  });

  const formHandler = handleSubmit(async (data) => {
    try {
      await changePassword({ token, ...data });

      showToast({ title: "Пароль успешно изменён!", variant: "success" });
      reset();
    } catch (err) {
      console.log(err);
      showToast({ title: "Ошибка при смене пароля", variant: "error" });
    }
  });

  return (
    <form className="flex flex-col gap-[10px]" onSubmit={formHandler}>
      <label
        className="font-normal cursor-pointer relative after:content-['*'] after:text-[#EB001B]"
        htmlFor="password"
      >
        Пароль
      </label>

      <div className="relative">
        <button
          className="absolute top-1/2 -translate-y-1/2 right-6 text-gold text-[14px] lg:text-[17px] font-semibold underline"
          type="submit"
        >
          Изменить пароль
        </button>
        <input
          className={"custom-input--white w-full"}
          id="password"
          type="password"
          placeholder="Пароль"
          {...register("new_password")}
        />
      </div>

      {errors["new_password"] && (
        <span className="mt-2 text-[#EB001B] text-[15px]">
          *{errors["new_password"].message}
        </span>
      )}
    </form>
  );
};
