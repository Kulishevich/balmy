"use client";
import { useOrderState } from "@/store/order";
import cn from "clsx";
import { useForm } from "react-hook-form";
import { OrderInputs } from "./courier-delivery-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/utils/schemes/order";
import { useEffect, useState } from "react";
import { sendOrder } from "@/api/order";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { showToast } from "../toast";
import { IMe } from "@/types/auth";

export type Post = "Европочта" | "Белпочта" | "СДЭК";

interface Props {
  className?: string;
  meInfo: IMe | null;
  token: string;
}

function ShippingDeliveryForm({ className, meInfo, token }: Props) {
  const [post, setPost] = useState<Post>("Европочта");
  const { setDeliveryType, setComment, getOrder } = useOrderState();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrderInputs>({
    resolver: yupResolver(orderSchema),
  });

  useEffect(() => {
    setValue("fullName", meInfo?.name || "");
    setValue("email", meInfo?.email || "");
    setValue("phone", meInfo?.phone || "");
    setValue("address", meInfo?.actual_address || "");
  }, [meInfo, setValue]);

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

    const requestData = {
      customer_name: orderDataCopy.fullName,
      phone: orderDataCopy.phone,
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
      router.push("/");
      showToast({ title: "Заказ оформлен успешно", variant: "success" });
      window.open("/files/example.pdf", "_blank");
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
