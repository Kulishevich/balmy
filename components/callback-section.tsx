"use client";
import { useForm } from "react-hook-form";
import Action from "./action";
import SocialNetwokrs from "./social-networks";
import { CallbackInputs } from "./callback-popup";
import { yupResolver } from "@hookform/resolvers/yup";
import { callbackSchema } from "@/utils/schemes/callback";
import { toast } from "sonner";
import cn from "clsx";
import Link from "next/link";
import { sendFeedback } from "@/api/feedback";

function CallbackSectoin() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CallbackInputs>({
    resolver: yupResolver(callbackSchema),
  });
  const personalInfo = watch("personal-info");

  function resetFormFields() {
    setValue("phone", "");
    setValue("comment", "");
    setValue("personal-info", false);
  }

  async function onSubmit(callbackData: CallbackInputs) {
    try {
      const data = await sendFeedback(callbackData);

      console.log(data);

      resetFormFields();
      toast.success("Сообщение отправлено");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при отправке формы обратной связи");
    }
  }

  return (
    <section className="mt-[72px] lg:mt-[120px] container">
      <div className="border border-white/30 rounded-[5px] flex flex-col lg:flex-row">
        <div className="w-full lg:max-w-[450px] xl:max-w-[550px] lg:min-h-[535px] bg-white p-6 lg:p-[54px] text-black flex flex-col text-center lg:text-left rounded-s-md">
          <p
            className={
              "text-[28px] font-extrabold sm:text-[41px] sm:font-semibold"
            }
          >
            Обратный звонок
          </p>
          <p className="mt-4 font-normal">
            Чтобы получить более детальную информацию о наших услугах,
            пожалуйста, заполните форму обратной связи, и мы с вами свяжемся
            в ближайшее время.
          </p>
          <div className="mt-12 lg:mt-auto mx-auto lg:mx-0">
            <span>Соцсети:</span>
            <SocialNetwokrs className="mt-3" />
          </div>
        </div>
        <form
          className="w-full py-8 lg:py-12 px-[18px] lg:px-[54px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-[21px]" htmlFor="phone">
              Телефон
            </label>
            <input
              className={cn("custom-input mt-[6px]", {
                "custom-input--error": errors["phone"],
              })}
              id="phone"
              placeholder="+ 375 (___) ___-__-__"
              {...register("phone")}
            />
            {errors["phone"] && (
              <span className="mt-2 text-[#EB001B] text-[15px]">
                *{errors["phone"].message}
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-col">
            <label className="text-[21px]" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              className={cn("custom-textarea mt-[6px]", {
                "custom-textarea--error": errors["comment"],
              })}
              id="comment"
              placeholder="Комментарий"
              {...register("comment")}
            />
            {errors["comment"] && (
              <span className="mt-2 text-[#EB001B] text-[15px]">
                *{errors["comment"].message}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              className="custom-checkbox border border-white/30"
              id="personal-data"
              type="checkbox"
              {...register("personal-info")}
            />
            <label
              className="font-normal cursor-pointer"
              htmlFor="personal-data"
            >
              <Link
                href={"/privacy-policy"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Согласие на обработку персональных данных
              </Link>
            </label>
          </div>
          <Action
            type="button"
            className="mt-6 sm:max-w-[300px] w-full"
            size="big"
            color="white"
            typeButton="submit"
            disabled={!personalInfo}
          >
            Отправить
          </Action>
        </form>
      </div>
    </section>
  );
}

export default CallbackSectoin;
