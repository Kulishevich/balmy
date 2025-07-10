"use client";
import FastCarSmallIcon from "@/public/icons/fast-car-small.svg";
import BoxIcon from "@/public/icons/box.svg";
import CourierDeliveryForm from "@/components/delivery-payment/courier-delivery-form";
import ShippingDeliveryForm from "@/components/delivery-payment/shipping-delivery-form";
import cn from "clsx";
import { useOrderState } from "@/store/order";
import { IMe } from "@/types/auth";

function DeliverySection({
  meInfo,
  token,
}: {
  meInfo: IMe | null;
  token: string;
}) {
  const { deliveryType, setDeliveryType } = useOrderState();

  function handleClickOnCourierDelivery() {
    if (deliveryType == "Courier") {
      return;
    }

    setDeliveryType("Courier");
  }

  function handleClickOnShippingDelivery() {
    if (deliveryType == "Post") {
      return;
    }

    setDeliveryType("Post");
  }

  return (
    <section className="container mt-[58px]">
      <div className="grid grid-cols-2 gap-x-[30px]">
        <button
          className={cn(
            "transition cursor-pointer text-center mx-auto flex flex-col items-center",
            {
              "opacity-100": deliveryType == "Courier",
              "opacity-25": deliveryType == "Post",
            }
          )}
          onClick={handleClickOnCourierDelivery}
        >
          <FastCarSmallIcon className="fill-white" />
          <h3 className="mt-3 text-[20px] max-w-[122px] sm:max-w-full sm:text-[26px]">
            Курьером по Минску
          </h3>
        </button>
        <button
          className={cn(
            "transition cursor-pointer text-center mx-auto flex flex-col items-center",
            {
              "opacity-100": deliveryType == "Post",
              "opacity-25": deliveryType == "Courier",
            }
          )}
          onClick={handleClickOnShippingDelivery}
        >
          <BoxIcon />
          <h3 className="text-[20px] max-w-[122px] sm:max-w-full sm:text-[26px]">
            Почтой по всей РБ
          </h3>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[30px]">
        <CourierDeliveryForm
          token={token}
          meInfo={meInfo}
          className={cn("transition", {
            "opacity-100": deliveryType == "Courier",
            "opacity-25 hidden lg:flex": deliveryType == "Post",
          })}
        />
        <ShippingDeliveryForm
          token={token}
          meInfo={meInfo}
          className={cn("transition", {
            "opacity-100": deliveryType == "Post",
            "opacity-25 hidden lg:flex": deliveryType == "Courier",
          })}
        />
      </div>
    </section>
  );
}

export default DeliverySection;
