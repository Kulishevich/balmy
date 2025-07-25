import Breadcrumbs from "@/components/breadcrumbs";
import { NewsCard } from "@/components/news/news-card";
import Title from "@/components/title";
import Image from "next/image";
import HeartIcon from "@/public/icons/heart.svg";
import Action from "@/components/action";

async function NewsPage() {
  return (
    <div className="container px-0">
      <Title type="h1" className="container mt-10 text-center">
        Лента новостей
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <p className="container mt-[26px] text-center font-normal text-[17px] mb-8 max-w-[850px]">
        Лента ваших работ и достижений. Делитесь своими фото, прикерпляйте
        ссылки. Получайте награды по итогам недели
      </p>
      <Action
        color="white"
        className="w-[630px] mx-auto mb-10"
        type="link"
        href="/news/add-new-post"
      >
        Добавить новость
      </Action>
      <div className="container flex justify-between w-full">
        <div className="flex flex-col gap-[25px]">
          <p className="font-bold text-[24px] text-gold">Текущий Лидер </p>
          <div className="flex flex-col bg-white rounded-[5px] p-5 text-black">
            <div className="flex gap-4 items-center mb-6">
              <Image
                src={"/images/news-profile.png"}
                width={48}
                height={48}
                alt="profile-photo"
              />
              <p className="font-semibold text-[24px]">Иванов Николай</p>
            </div>
            <div className="flex flex-col gap-[21px] mb-[51px]">
              <div className="flex gap-7">
                <p className="w-[225px] font-normal text-[17px]">
                  Количество оценок:
                </p>
                <p className="w-[225px] font-bold text-[17px] flex gap-1 items-center">
                  <HeartIcon />
                  100
                </p>
              </div>
              <div className="flex gap-7">
                <p className="w-[225px] font-normal text-[17px]">
                  Всего постов:
                </p>
                <p className="w-[225px] font-bold text-[17px]">12</p>
              </div>
              <div className="flex gap-7">
                <p className="w-[225px] font-normal text-[17px]">Статус:</p>
                <p className="w-[225px] font-bold text-[17px]">Партнер Balmy</p>
              </div>
            </div>
            <p className="w-full py-4 bg-gold text-center rounded-[5px] text-white font-medium text-[21px]">
              5 дней до итогов 🔥
            </p>
          </div>
          <p className="font-bold text-[24px] text-gold">Текущий приз </p>
          <div className="flex flex-col items-center gap-[11px] bg-white rounded-[5px] pt-[34px] pb-[25px] text-black">
            <Image
              src={"/images/prize.png"}
              width={276}
              height={238}
              alt="prize"
            />
            <p className="text-[24px] font-semibold w-[272px] text-center">
              Подарочный набор от Hey Joe!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
