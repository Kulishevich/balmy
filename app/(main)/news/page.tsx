import Breadcrumbs from "@/components/breadcrumbs";
import { NewsCard } from "@/components/news/news-card";
import Title from "@/components/title";
import Image from "next/image";
import HeartIcon from "@/public/icons/heart.svg";

async function NewsPage() {
  return (
    <>
      <Title type="h1" className="container mt-10 text-center">
        Лента новостей
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <p className="container mt-[26px] text-center font-normal text-[17px] mb-[59px]">
        Лента ваших работ и достижений. Делитесь своими фото, прикерпляйте
        ссылки.
        <br />
        Получайте награды по итогам недели
      </p>
      <div className="container flex justify-between">
        <div className="flex flex-col gap-[25px]">
          <p className="font-bold text-[24px] text-gold">Текущий Лидер </p>
          <div className="flex flex-col bg-white rounded-[5px] p-5 text-black">
            <div className="flex gap-[35px] items-center">
              <Image
                src={"/images/news-profile.png"}
                width={48}
                height={48}
                alt="profile-photo"
              />
              <p>Иванов Николай</p>
            </div>
            <div className="flex flex-col gap-[21px] mb-[51px]">
              <div className="flex ">
                <p className="w-[197px] font-normal text-[17px]">
                  Количество оценок:
                </p>
                <p className="w-[183px] font-normal text-[17px] flex items-center">
                  <HeartIcon />
                  100
                </p>
              </div>
              <div className="flex ">
                <p className="w-[197px] font-normal text-[17px]">
                  Всего постов:
                </p>
                <p className="w-[183px] font-normal text-[17px]">12</p>
              </div>
              <div className="flex ">
                <p className="w-[197px] font-normal text-[17px]">Статус:</p>
                <p className="w-[183px] font-normal text-[17px]">
                  Партнер Balmy
                </p>
              </div>
            </div>
            <p className="w-full py-4 bg-gold text-center rounded-[5px] text-white font-medium text-[21px]">
              5 дней до итогов
            </p>
          </div>
          <p className="font-bold text-[24px] text-gold">Текущий приз </p>
          <div className="flex flex-col items-center gap-[11px] bg-white rounded-[5px] pt-[34px] pb-[17px] text-black">
            <Image
              src={"/images/prize.png"}
              width={276}
              height={238}
              alt="prize"
            />
            <p className="">Подарочный набор от Hey Joe!</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </>
  );
}

export default NewsPage;
