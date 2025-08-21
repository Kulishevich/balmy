"use client";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { newPotsFormScheme } from "@/utils/schemes/new-post-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import EyeIcom from "@/public/icons/eye-icon.svg";
import { RichTextEditor } from "@/components/news/rich-text-editor";
import { createNewPost } from "@/api/posts";
import Cookies from "js-cookie";
import { useRef, useState } from "react";

type NewPostForm = {
  title: string;
  content: string;
};

function NewsPage() {
  const [preview, setPreview] = useState<File | null>(null);
  const token = Cookies.get("token") || "";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPreview(e.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPostForm>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: yupResolver(newPotsFormScheme),
  });

  const formHandler = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (preview) formData.append("photo", preview);

    try {
      const res = await createNewPost({
        token,
        formData,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="container flex flex-col items-center">
      <Title type="h1" className="container mt-10 text-center">
        Добавить новость
      </Title>
      <Breadcrumbs className="mt-4 mx-auto mb-10" />
      <form
        onSubmit={formHandler}
        className="flex flex-col gap-6 items-start max-w-[850px]"
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

        <div className="flex flex-col gap-[6px] w-full">
          <label className={clsx("font-normal cursor-pointer")}>
            Содержание новости
          </label>

          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleUploadClick}
          className="bg-[#E1E1E1] rounded-[5px] px-6 py-4 flex items-center gap-[6px] text-dark-grey font-medium text-[17px]"
        >
          <EyeIcom />
          Загрузить превью
        </button>

        <Action color="gold" className="w-[300px]" typeButton="submit">
          Опубликовать
        </Action>
      </form>
    </div>
  );
}

export default NewsPage;
