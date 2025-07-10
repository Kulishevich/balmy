"use client";
import DeliverySection from "@/components/delivery-payment/delivery-section";
import PaymentMethodsSection from "@/components/delivery-payment/payment-methods-section";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { useOrderState } from "@/store/order";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getMe } from "@/api/auth";
import { IMe } from "@/types/auth";

function DeliveryPayment() {
  const [meInfo, setMeInfo] = useState<IMe | null>(null);
  const [personalInfo, setPersonalInfo] = useState(false);
  const token = Cookies.get("token") || "";
  const router = useRouter();
  const { deliveryType } = useOrderState();
  const form =
    deliveryType == "Courier"
      ? "courier-delivery-form"
      : "shipping-delivery-form";

  function handleChangePersonalInfo(e: React.ChangeEvent<HTMLInputElement>) {
    setPersonalInfo(e.target.checked);
  }

  useEffect(() => {
    const getMeInfo = async (token: string) => {
      try {
        const data = await getMe(token);
        setMeInfo(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        router.push("/authorization");
      }
    };

    if (token) {
      getMeInfo(token);
    } else {
      router.push("/authorization");
    }
  }, []);

  return (
    <>
      <Title className="mt-10 text-center">Доставка и оплата</Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <DeliverySection meInfo={meInfo} token={token} />
      <PaymentMethodsSection deliveryType={deliveryType} />
      <div className="container mt-[42px] lg:mt-[120px]">
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox border border-white/30"
            id="personal-data"
            type="checkbox"
            checked={personalInfo}
            onChange={handleChangePersonalInfo}
          />
          <label className="font-normal cursor-pointer" htmlFor="personal-data">
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
          className="mt-10 w-full"
          size="big"
          color="white"
          typeButton="submit"
          form={form}
          disabled={!personalInfo}
        >
          Оформить заказ
        </Action>
      </div>
    </>
  );
}

export default DeliveryPayment;
