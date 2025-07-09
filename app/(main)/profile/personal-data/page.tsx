import { getMe } from "@/api/auth";
import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import MedalIcon from "@/public/icons/medal-star.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function PersonalDataPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  const me = await getMe(token);

  if (!token) {
    redirect("/authorization");
  }

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Личные данные
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container w-full lg:w-[850px] flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[10px]">
            <label
              className="font-normal cursor-pointer relative after:content-['*'] after:text-[#EB001B]"
              htmlFor="name"
            >
              ФИО / Название компании
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="name"
              placeholder="ФИО / Название компании"
              value={me?.name}
              disabled
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              className="font-normal cursor-pointer relative after:content-['*'] after:text-[#EB001B]"
              htmlFor="phone"
            >
              Номер телефона
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="phone"
              placeholder="Номер телефона"
              value={me?.phone}
              disabled
            />
          </div>
          <div className="flex flex-col gap-[10px] items-start">
            <p className="font-normal cursor-pointer">Статус</p>
            <button
              disabled
              className="border border-light-gold flex gap-[6px] py-[17px] px-[50px] rounded-[5px] w-full lg:w-[292px] items-center justify-center"
            >
              <MedalIcon />
              Партнёр Balmy
            </button>
          </div>
          {/* <div className="flex flex-col gap-[10px]">
            <label className="font-normal cursor-pointer" htmlFor="discount">
              Персональная скидка
            </label>
            <input
              className={"custom-input--white mt-[6px] "}
              id="discount"
              placeholder="Персональная скидка"
            />
            <span className="text-[#9E9E9E] relative before:content-['*'] before:text-gold">
              персональная скидка зависит от общей суммы заказов: 5%-при покупке
              от 1000 BYN, 10% - при покупке от 2000 BYN.
            </span>
          </div> */}
        </div>
        <Action
          type="link"
          href="/profile"
          className="w-full lg:w-[300px]"
          color={"gold"}
        >
          Назад
        </Action>
      </div>
    </>
  );
}

export default PersonalDataPage;
