import Title from "@/components/title";
import FastCarIcon from "@/public/icons/fast-car.svg";
import CertifiedIcon from "@/public/icons/certified.svg";
import DiscountIcon from "@/public/icons/discount.svg";
import CartIcon from "@/public/icons/cart.svg";
import cn from "clsx";
// import SectionAnimationWrapper from "../section-animation-wrapper";

const advatanges = [
  { name: "Быстрая доставка", Icon: FastCarIcon },
  { name: "Сертифицированная продукция", Icon: CertifiedIcon },
  { name: "Скидки постоянным покупателям", Icon: DiscountIcon },
  { name: "Эксклюзивный дистрибьютор", Icon: CartIcon },
];

function OurAdavantagesSection() {
  return (
    // <SectionAnimationWrapper>
    <section className="mt-[72px] lg:mt-[120px] container">
      <Title className="text-center">Наши преимущества</Title>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {advatanges.map((advatange, idx) => {
          const firstItem = idx == 0;
          const { name } = advatange;

          return (
            <div
              key={idx}
              className="relative w-full h-[189px] bg-dark-gray rounded-[5px] overflow-hidden flex sm:items-center p-4 sm:p-[34px]"
            >
              <p
                className={cn(
                  "text-white font-semibold text-[20px] sm:text-[30px]",
                  { "max-w-[100px] sm:max-w-[220px]": firstItem },
                  { "max-w-[195px] sm:max-w-[290px]": !firstItem }
                )}
              >
                {name}
              </p>
              <advatange.Icon className="absolute -right-28 sm:-right-12 -top-20 sm:top-1/2 sm:-translate-y-1/2 scale-75 sm:scale-100" />
            </div>
          );
        })}
      </div>
    </section>
    // </SectionAnimationWrapper>
  );
}

export default OurAdavantagesSection;
