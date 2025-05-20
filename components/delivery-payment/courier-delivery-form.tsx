"use client";
import cn from "clsx";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { appearanceAnimation } from "@/utils/animations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/utils/schemes/order";
import { useOrderState } from "@/store/order";
import { formatTimestampToDDMMYYYY } from "@/utils/helper";
import Calendar from "react-calendar";
import { sendOrder } from "@/api/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { createNewOrderMessage, sendMessageToTelegram } from "@/api/telegram";

interface Props {
  className?: string;
}

export type OrderInputs = {
  fullName: string;
  address: string;
  phone: string;
  email?: string;
};

function CourierDeliveryForm({ className }: Props) {
  const { setDeliveryType, setComment, getOrder } = useOrderState();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<OrderInputs>({
    resolver: yupResolver(orderSchema),
  });
  const { clearCart } = useCartStore();
  const [calendarValue, calendarOnChange] = useState<Value>(new Date());
  const [whenToDeliver, setWhenToDeliver] = useState<
    "quickly" | "specific-date"
  >("quickly");
  const [anonymously, setAnonymously] = useState(false);
  const router = useRouter();
  const minDate = new Date();

  function handleClickOnForm() {
    setDeliveryType("Courier");
  }

  function handleChangeWhenToDeliver(when: "quickly" | "specific-date") {
    return () => setWhenToDeliver(when);
  }

  function handleChangeAnonymously(e: React.ChangeEvent<HTMLInputElement>) {
    setAnonymously(e.target.checked);
  }

  async function onSubmit(orderData: OrderInputs) {
    const date = formatTimestampToDDMMYYYY(calendarValue?.toString());

    setComment(orderData, { anonymously, date, whenToDeliver });

    const order = getOrder();
    const orderDataCopy = orderData;

    toast.success("Отправляем вашу заявку, пожалуйста подождите...", {
      duration: 4000,
    });
    reset();
    try {
      const { order: orderResponse } = await sendOrder(order);

      if (orderResponse) {
        window.open(orderResponse, "_blank");
      }

      const message = createNewOrderMessage({
        name: orderDataCopy.fullName,
        phone: orderDataCopy.phone,
      });
      await sendMessageToTelegram(message);

      clearCart();
      router.push("/");
      toast.success("Заказ оформлен успешно", { duration: 5000 });
    } catch (err) {
      toast.error("Что-то пошло не так");
      console.log(err);
    }
  }

  return (
    <form
      id="courier-delivery-form"
      className={cn("mt-10 flex flex-col", className)}
      onClick={handleClickOnForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="fullName"
        className={cn("custom-input--dark w-full", {
          "custom-input--dark-error": errors["fullName"],
        })}
        placeholder="ФИО получателя"
        {...register("fullName")}
      />
      {errors["fullName"] && (
        <span className="mt-2 text-[#EB001B] text-[15px]">
          *{errors["fullName"].message}
        </span>
      )}
      <input
        className={cn("mt-5 custom-input--dark w-full", {
          "custom-input--dark-error": errors["address"],
        })}
        placeholder="Адрес"
        {...register("address")}
      />
      {errors["address"] && (
        <span className="mt-2 text-[#EB001B] text-[15px]">
          *{errors["address"].message}
        </span>
      )}
      <input
        className={cn("mt-5 custom-input--dark w-full", {
          "custom-input--dark-error": errors["phone"],
        })}
        placeholder="Номер телефона"
        {...register("phone")}
      />
      {errors["phone"] && (
        <span className="mt-2 text-[#EB001B] text-[15px]">
          *{errors["phone"].message}
        </span>
      )}
      <input
        className={cn("mt-5 custom-input--dark w-full", {
          "custom-input--dark-error": errors["email"],
        })}
        placeholder="Email, необязательно"
        {...register("email")}
      />
      {errors["email"] && (
        <span className="mt-2 text-[#EB001B] text-[15px]">
          *{errors["email"].message}
        </span>
      )}
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox--dark"
            id="quickly"
            type="radio"
            checked={"quickly" == whenToDeliver}
            onChange={handleChangeWhenToDeliver("quickly")}
          />
          <label className="font-normal cursor-pointer" htmlFor="quickly">
            Как можно быстрее
          </label>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <input
              className="custom-checkbox--dark"
              id="date"
              type="checkbox"
              checked={"specific-date" == whenToDeliver}
              onChange={handleChangeWhenToDeliver("specific-date")}
            />
            <label className="font-normal cursor-pointer" htmlFor="date">
              На определенную дату
            </label>
          </div>
          <AnimatePresence>
            {whenToDeliver == "specific-date" && (
              <m.div className="mt-5" {...appearanceAnimation}>
                <Calendar
                  locale="ru-RU"
                  className="rounded-[5px]"
                  minDate={minDate}
                  onChange={calendarOnChange}
                  value={calendarValue}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox--dark"
            id="anonym"
            type="checkbox"
            checked={anonymously}
            onChange={handleChangeAnonymously}
          />
          <label className="font-normal cursor-pointer" htmlFor="anonym">
            Анонимно (подойдёт для сюрприза)
          </label>
        </div>
      </div>
    </form>
  );
}

export default CourierDeliveryForm;
