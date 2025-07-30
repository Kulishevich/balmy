"use client";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { newPotsFormScheme } from "@/utils/schemes/new-post-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import EyeIcom from "@/public/icons/eye-icon.svg";
import { RichTextEditor } from "@/components/news/rich-text-editor";
import { useState } from "react";

type NewPostForm = {
  title: string;
};

function NewsPage() {
  const [value, setValue] = useState<string>("");
  console.log(value);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPostForm>({
    resolver: yupResolver(newPotsFormScheme),
  });

  const formHandler = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div className="container flex flex-col items-center">
      <Title type="h1" className="container mt-10 text-center">
        Лента новостей
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <form
        onSubmit={formHandler}
        className="flex flex-col items-start w-[850px]"
      >
        <div className="flex flex-col gap-[6px] w-full">
          <label className={clsx("font-normal cursor-pointer")} htmlFor="title">
            Заголовок новости
          </label>
          <input
            className={clsx("custom-input--white mt-[6px] w-full", {
              ".custom-input-white--error": errors["title"],
            })}
            id="title"
            placeholder="Заголовок новости"
            {...register("title")}
          />
          {errors["title"] && (
            <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
              *{errors["title"].message}
            </span>
          )}
        </div>
        <RichTextEditor
          onChange={(val: string) => setValue(val)}
          value={value}
        />
        <button className="bg-[#E1E1E1] rounded-[5px] px-6 py-4 flex items-center gap-[6px] text-dark-grey font-medium text-[17px]">
          <EyeIcom />
          Посмотреть превью
        </button>
        <Action color="gold" className="w-[300px]">
          Опубликовать
        </Action>
      </form>
    </div>
  );
}

export default NewsPage;
