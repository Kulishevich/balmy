"use client";
import DeliverySection from "@/components/delivery-payment/delivery-section";
import PaymentMethodsSection from "@/components/delivery-payment/payment-methods-section";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { useOrderState } from "@/store/order";
import { useState } from "react";
import Link from "next/link";

function DeliveryPayment() {
  const [personalInfo, setPersonalInfo] = useState(false);
  const { deliveryType } = useOrderState();
  const form =
    deliveryType == "Courier"
      ? "courier-delivery-form"
      : "shipping-delivery-form";

  function handleChangePersonalInfo(e: React.ChangeEvent<HTMLInputElement>) {
    setPersonalInfo(e.target.checked);
  }

  return (
    <>
      <Title className="mt-10 text-center">Доставка и оплата</Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <DeliverySection />
      <PaymentMethodsSection deliveryType={deliveryType} />
      <div className="container mt-[42px] lg:mt-[120px]">
        <div className="flex items-center gap-2">
          <input
            className="custom-checkbox"
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
