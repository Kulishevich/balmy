"use client";
import Title from "@/components/title";
import PayCardsIcon from "@/public/icons/pay-cards.svg";
import PayCashIcon from "@/public/icons/pay-cash.svg";
import CashierPayIcon from "@/public/icons/cashier-pay.svg";
import cn from "clsx";
import { DeliveryType, PaymentType, useOrderState } from "@/store/order";
import { useEffect } from "react";
import Image from "next/image";

const paymentMethods = [
  {
    type: "Card",
    name: "Онлайн-оплата",
    Icon: PayCardsIcon,
    description: "После оплаты менеджер перезвонит вам и подтвердит заказ",
  },
  {
    type: "Cash",
    name: "Наличными при получении",
    Icon: PayCashIcon,
    description: "После оплаты менеджер перезвонит вам и подтвердит заказ",
  },
  {
    type: "CardPhys",
    name: "Картой при получении",
    Icon: CashierPayIcon,
    description: "После оплаты менеджер перезвонит вам и подтвердит заказ",
  },
];

function PaymentMethodsSection({
  deliveryType,
}: {
  deliveryType: DeliveryType;
}) {
  const { paymentType, setPaymentType } = useOrderState();
  const isPost = deliveryType == "Post";
  function handleClickOnPaymentMethod(paymentType: PaymentType) {
    return () => setPaymentType(paymentType);
  }

  useEffect(() => {
    if (isPost) {
      setPaymentType("Card");
    }
  }, [isPost, setPaymentType]);

  return (
    <section className="mt-[72px] lg:mt-[120px] container">
      <Title className="text-center">Способ оплаты</Title>
      <div className="mt-6 lg:mt-20 grid grid-cols-2 lg:grid-cols-3 gap-y-[42px] gap-x-[21px]">
        {paymentMethods.map((paymentMethod, idx) => {
          // const isFirstItem = idx == 0;
          const { name, description, type } = paymentMethod;
          const isSelected = type == paymentType;

          if (isPost && (type === "Cash" || type === "CardPhys")) return;
          return (
            <div
              key={idx}
              className={cn(
                "flex flex-col items-center justify-between cursor-pointer transition",
                {
                  "opacity-100": isSelected,
                  "opacity-50": !isSelected,
                  // "col-span-2 lg:col-span-1": isFirstItem,
                }
              )}
              onClick={handleClickOnPaymentMethod(type as PaymentType)}
            >
              <h3 className="text-center text-[20px] sm:text-[26px]">{name}</h3>
              <paymentMethod.Icon className="mt-[30px]" />
              <p className="mt-[21px] max-w-[196px] font-normal hidden lg:inline">
                {description}
              </p>
            </div>
          );
        })}

        <div
          className={cn(
            "flex flex-col items-center justify-between cursor-pointer transition",
            {
              "opacity-100": paymentType === "PaymentForLegalEntity",
              "opacity-50": paymentType !== "PaymentForLegalEntity",
            }
          )}
          onClick={handleClickOnPaymentMethod("PaymentForLegalEntity")}
        >
          <h3 className="text-center text-[20px] sm:text-[26px]">
            Оплата для Юр.лица
          </h3>
          {/* <paymentMethod.Icon className="mt-[30px]" /> */}
          <Image
            src={"/icons/free-icon-financial.png"}
            width={100}
            height={100}
            alt="payment-method-image"
          />
          <p className="mt-[21px] max-w-[196px] font-normal hidden lg:inline">
            После формирование заказа в отдельном окне откроется счет-фактура в
            pdf
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaymentMethodsSection;
