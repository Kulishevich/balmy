import DeliveryCarIcon from "@/public/icons/delivery-car.svg";
import { FREE_SHIPPING_PRICE } from "@/utils/constants";

function FreeShippingSection() {
  return (
    <section className="mt-[72px] lg:mt-[120px] container">
      <div className="min-h-[305px] xl:min-h-max bg-dark-gray w-full py-[35px] xl:px-[110px] px-[60px] rounded-md relative overflow-hidden">
        <div className="max-w-[540px] mx-auto xl:mx-0 text-white text-center">
          <p className="text-[28px] lg:text-[52px] font-extrabold sm:font-bold">
            Бесплатная доставка
          </p>
          <p className="mt-4 lg:mt-2 text-[20px] lg:text-[30px] font-semibold">
            При заказе от {FREE_SHIPPING_PRICE} byn
          </p>
        </div>
        <DeliveryCarIcon className="scale-[.5] xl:scale-100 absolute right-1/2 translate-x-1/2 xl:translate-x-0 xl:bottom-auto -bottom-28 xl:right-12 xl:top-1/2 xl:-translate-y-1/2" />
      </div>
    </section>
  );
}

export default FreeShippingSection;
