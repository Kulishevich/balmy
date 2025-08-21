import Breadcrumbs from "@/components/breadcrumbs";
import { NewsCard } from "@/components/news/news-card";
import Title from "@/components/title";
import Image from "next/image";
import HeartIcon from "@/public/icons/heart.svg";
import Action from "@/components/action";
import { cookies } from "next/headers";
import { getAllPosts } from "@/api/posts";
import { redirect } from "next/navigation";

async function NewsPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  if (!token) {
    redirect("/authorization");
  }

  const news = await getAllPosts(token);

  return (
    <div className="container">
      <Title type="h1" className="container mt-6 lg:mt-10 text-center">
        Лента новостей
      </Title>

      <Breadcrumbs className="mt-4 mx-auto" />

      <p className="container mt-5 mb-6 lg:mt-[26px] lg:mb-8 text-center font-normal text-[17px] max-w-[850px]">
        Лента ваших работ и достижений. Делитесь своими фото, прикерпляйте
        ссылки. Получайте награды по итогам недели
      </p>

      <Action
        color="white"
        className="w-full lg:w-[630px] mx-auto mb-10"
        type="link"
        href="/news/add-new-post"
      >
        Добавить новость
      </Action>

      <div className="grid grid-cols-12 gap-[30px] w-full">
        <div className="col-span-12  lg:col-span-5 flex flex-col gap-[25px]">
          <p className="font-bold text-[24px] text-gold text-center lg:text-start">
            Текущий Лидер
          </p>

          <div className="flex flex-col bg-white rounded-[5px] p-5 text-black">
            <div className="flex gap-4 items-center mb-6">
              <Image
                src={"/images/news-profile.png"}
                width={60}
                height={60}
                alt="profile-photo"
              />
              <p className="font-semibold text-[24px]">Иванов Николай</p>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <div className="flex gap-7 border-b border-[#E1E1E1] pb-4">
                <p className="w-[50%] font-normal text-[17px] ">
                  Количество оценок:
                </p>
                <p className="w-[50%] font-bold text-[17px] flex gap-1 items-center justify-end lg:justify-normal">
                  <HeartIcon />
                  100
                </p>
              </div>
              <div className="flex gap-7 border-b border-[#E1E1E1] pb-4">
                <p className="w-[50%] font-normal text-[17px] ">
                  Всего постов:
                </p>
                <p className="w-[50%] font-bold text-[17px] flex gap-1 items-center justify-end lg:justify-normal">
                  12
                </p>
              </div>
              <div className="flex gap-7 border-b border-[#E1E1E1] pb-4">
                <p className="w-[50%] font-normal text-[17px] ">Статус:</p>
                <p className="w-[50%] font-bold text-[17px] flex gap-1 items-center justify-end lg:justify-normal">
                  Партнер Balmy
                </p>
              </div>
            </div>

            <p className="w-full py-4 bg-gold text-center rounded-[5px] text-white font-medium text-[21px]">
              5 дней до итогов 🔥
            </p>
          </div>

          <p className="font-bold text-[24px] text-gold text-center lg:text-start">
            Текущий приз{" "}
          </p>

          <div className="flex flex-col items-center gap-[11px] bg-white rounded-[5px] pt-[34px] pb-[25px] text-black">
            <Image
              src={"/images/prize.png"}
              width={276}
              height={238}
              alt="prize"
              className="object-contain w-[276px] h-[238px]"
            />
            <p className="text-[24px] font-semibold w-[272px] text-center">
              Подарочный набор от Hey Joe!
            </p>
          </div>
        </div>

        <div className="col-span-12  lg:col-span-6 lg:col-start-7 flex flex-col gap-[30px]">
          {news?.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
