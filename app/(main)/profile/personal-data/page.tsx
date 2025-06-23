import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import MedalIcon from "@/public/icons/medal-star.svg";
async function PrivacyPolicyPage() {
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Личные данные
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container w-[850px] flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[10px]">
            <label
              className="font-normal cursor-pointer relative after:content-['*'] after:text-[#EB001B]"
              htmlFor="date"
            >
              ФИО / Название компании
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="name"
              placeholder="ФИО / Название компании"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              className="font-normal cursor-pointer relative after:content-['*'] after:text-[#EB001B]"
              htmlFor="date"
            >
              Номер телефона
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="name"
              placeholder="ФИО / Название компании"
            />
          </div>
          <div className="flex flex-col gap-[10px] items-start">
            <p className="font-normal cursor-pointer">Статус</p>
            <button
              disabled
              className="border border-light-gold flex gap-[6px] py-[17px] px-[50px] rounded-[5px]"
            >
              <MedalIcon />
              Партнёр Balmy
            </button>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              Персональная скидка
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="name"
              placeholder="ФИО / Название компании"
            />
            <span className="text-[#9E9E9E] relative before:content-['*'] before:text-gold">
              персональная скидка зависит от общей суммы заказов: 5%-при покупке
              от 1000 BYN, 10% - при покупке от 2000 BYN.
            </span>
          </div>
        </div>
        <Action className="w-[300px]" color={"gold"}>
          Назад
        </Action>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
