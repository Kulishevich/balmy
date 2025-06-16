import TopBrands from "@/components/home/top-brands";
import Title from "@/components/title";
import Image from "next/image";

function MainSection() {
  return (
    <section className="mt-4 lg:mt-[44px] container">
      <div className="relative w-full lg:min-h-[400px] min-h-[431px] bg-[#080F08] lg:bg-[url('/images/beard-balm.webp')] bg-center bg-no-repeat bg-cover rounded-[5px]">
        <div className="absolute w-full h-[322px] bottom-0 lg:hidden">
          <Image
            src="/images/beard-balm-mobile.webp"
            fill
            alt="main screen"
            className="object-contain"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,#080F08_0%,rgba(8,15,8,0)_35%)] pointer-events-none" />
        </div>

        <div className="absolute inset-0">
          <div className="mt-[64px] text-center lg:text-left max-w-[280px] mx-auto lg:max-w-full lg:mx-0 lg:ml-[96px] text-white">
            <Title type="main" className="max-w-[728px]">
              Профессиональная косметика оптом
            </Title>
            <p className="mt-4 text-[20px] lg:text-[30px] font-semibold">
              Только оригинальная продукция
            </p>
          </div>
        </div>
        <TopBrands className="absolute top-[calc(100%-82px)] lg:-bottom-[101px] w-[calc(100%-24px)] left-1/2 -translate-x-1/2 lg:w-full" />
      </div>
    </section>
  );
}

export default MainSection;
