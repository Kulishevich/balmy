"use client";
import { useOrderState } from "@/store/order";
import cn from "clsx";
import { useForm } from "react-hook-form";
import { OrderInputs } from "./courier-delivery-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/utils/schemes/order";
import { useState } from "react";
import { toast } from "sonner";
import { sendOrder } from "@/api/order";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { createNewOrderMessage, sendMessageToTelegram } from "@/api/telegram";

export type Post = "Европочта" | "Белпочта" | "СДЭК";

interface Props {
  className?: string;
}

function ShippingDeliveryForm({ className }: Props) {
  const [post, setPost] = useState<Post>("Европочта");
  const { setDeliveryType, setComment, getOrder } = useOrderState();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<OrderInputs>({
    resolver: yupResolver(orderSchema),
  });

  function handleClickOnForm() {
    setDeliveryType("Post");
  }

  function handleChangePost(post: Post) {
    return () => setPost(post);
  }

  async function onSubmit(orderData: OrderInputs) {
    setComment(orderData, { post });

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
      id="shipping-delivery-form"
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
        placeholder={post === "Европочта" ? "Номер отделения" : "Адрес"}
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
            id="europost"
            type="checkbox"
            checked={post == "Европочта"}
            onChange={handleChangePost("Европочта")}
          />
          <label className="font-normal cursor-pointer" htmlFor="europost">
            Европочта (в строке Адрес укажите номер отделения)
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox--dark"
            id="belpost"
            type="checkbox"
            checked={post == "Белпочта"}
            onChange={handleChangePost("Белпочта")}
          />
          <label className="font-normal cursor-pointer" htmlFor="belpost">
            Белпочта
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox--dark"
            id="sdek"
            type="checkbox"
            checked={post == "СДЭК"}
            onChange={handleChangePost("СДЭК")}
          />
          <label className="font-normal cursor-pointer" htmlFor="sdek">
            СДЭК (доставка за счет покупателя)
          </label>
        </div>
      </div>
    </form>
  );
}

export default ShippingDeliveryForm;
