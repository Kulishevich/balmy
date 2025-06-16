"use client";
import Action from "@/components/action";
import { usePopupStore } from "@/store/popup";

const possibilities = [
  "Широкий спектр ароматов укладочных средств и средств для бритья.",
  "Разные уровни фиксации и блеска.",
  "Разнообразие средств: масла, бальзамы, помада, пудра, лосьоны, крема.",
  "Работаем с минимальными партиями.",
  "Высокая доходность, широкая линейка, уникальные ароматы укладочных средств, стиль, дизайн и высокое качество.",
  "Все наши средства созданы вручную из натуральных компонентов.",
  "Высокая маржинальность продукции при реализации обеспечит вас дополнительным доходом.",
];

function CooperationSection() {
  const { createPopup } = usePopupStore();

  function handleClickOnCallbackButton() {
    createPopup({ type: "callback" });
  }

  return (
    <section id="cooperation" className="pt-[72px] lg:pt-[120px] container">
      <div className="w-full text-white bg-[url('/images/partner.webp')] bg-no-repeat bg-cover bg-bottom sm:bg-center py-8 sm:py-9 px-6 sm:px-12 rounded-[5px]">
        <p className="text-center sm:text-left text-[28px] lg:text-[52px] font-extrabold sm:font-bold">
          Стань партнёром Balmy!
        </p>
        <p className="mt-3 text-[20px] sm:text-[26px] text-center sm:text-left">
          Новые возможности для вашего барбершопа
        </p>
        <ul className="mt-5 sm:mt-8 pl-6 list-disc font-normal max-w-[621px]">
          {possibilities.map((possibility, idx) => {
            return <li key={idx}>{possibility}</li>;
          })}
        </ul>
        <Action
          type="button"
          className="mt-[30px] sm:mt-9 sm:max-w-[300px] w-full"
          size="big"
          color="green"
          onClick={handleClickOnCallbackButton}
        >
          Связаться с нами
        </Action>
      </div>
    </section>
  );
}

export default CooperationSection;
