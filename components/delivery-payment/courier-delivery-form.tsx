"use client";
import cn from "clsx";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { appearanceAnimation } from "@/utils/animations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/utils/schemes/order";
import { useOrderState } from "@/store/order";
import { formatTimestampToDDMMYYYY, normalizePhone } from "@/utils/helper";
import Calendar from "react-calendar";
import { sendOrder } from "@/api/order";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { showToast } from "../toast";
import { IMe } from "@/types/auth";
import { OrderRequest } from "@/types/order";

interface Props {
  className?: string;
  meInfo: IMe | null;
  token: string;
}

export type OrderInputs = {
  fullName: string;
  address: string;
  phone: string;
  email?: string;
};

function CourierDeliveryForm({ className, meInfo, token }: Props) {
  const { setDeliveryType, setComment, getOrder } = useOrderState();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
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

  useEffect(() => {
    setValue("fullName", meInfo?.name || "");
    setValue("email", meInfo?.email || "");
    setValue("phone", meInfo?.phone || "");
    setValue("address", meInfo?.addresses.full_address || "");
  }, [meInfo, setValue]);

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

    const normalPhone = normalizePhone(orderDataCopy.phone);

    const requestData: OrderRequest = {
      customer_name: orderDataCopy.fullName,
      phone: normalPhone,
      email: orderDataCopy.email,
      address: orderDataCopy.address,
      comment: order.comment,
      delivery_method: order.deliveryType,
      payment_method: order.paymentType,
      client_moysklad_id: meInfo?.moysklad_id || "",
      items: order.items.map((elem) => ({
        product_id: elem.product_id,
        quantity: elem.quantity,
      })),
    };

    reset();
    try {
      const data = await sendOrder({ orderData: requestData, token });

      if (data?.data.payment_url) {
        window.open(data?.data.payment_url, "_blank");
      }

      clearCart();
      showToast({ title: "Заказ оформлен успешно", variant: "success" });
      router.push("/");
    } catch (err) {
      showToast({
        title: "Произошла ошибка",
        description: "Пожалуйста, повторите попытку ещё раз.",
        variant: "error",
      });
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
        className={cn("custom-input--delivery w-full", {
          "custom-input-delivery--error": errors["fullName"],
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
        className={cn("mt-5 custom-input--delivery w-full", {
          "custom-input-delivery--error": errors["address"],
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
        className={cn("mt-5 custom-input--delivery w-full", {
          "custom-input-delivery--error": errors["phone"],
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
        className={cn("mt-5 custom-input--delivery w-full", {
          "custom-input-delivery--error": errors["email"],
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
