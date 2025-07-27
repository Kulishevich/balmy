"use client";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { signUpSchema } from "@/utils/schemes/sign-up";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const TextEditor = dynamic(() => import("@/components/news/text-editor"), {
  ssr: false,
});

type SignUpForm = {
  fullName: string;
  phone: string;
  comment: string;
  "personal-info": boolean;
  email: string;
};

function NewsPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  return (
    <div className="containerа">
      <Title type="h1" className="container mt-10 text-center">
        Лента новостей
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
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
      {/* <TextEditor /> */}
      <Action>Посмотреть превью</Action>
    </div>
  );
}

export default NewsPage;
