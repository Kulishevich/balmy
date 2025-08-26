import Breadcrumbs from "@/components/breadcrumbs";
import { NewsCard } from "@/components/news/news-card";
import Title from "@/components/title";
import Image from "next/image";
import HeartIcon from "@/public/icons/heart.svg";
import Action from "@/components/action";
import { cookies } from "next/headers";
import { getAllPosts } from "@/api/posts";
import { redirect } from "next/navigation";
import {
  getActiveRaffle,
  // getActiveRaffleLider,
  getActiveRafflePrize,
} from "@/api/raffles";
import Link from "next/link";
import Pagination from "@/components/pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function NewsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  if (!token) {
    redirect("/authorization");
  }

  const news = await getAllPosts({ token, page });

  const activeRaffle = await getActiveRaffle(token);
  const activePrize = await getActiveRafflePrize(token);
  // const activeLider = await getActiveRaffleLider(token);
  // console.log(activeRaffle);
  // console.log("lider:", activeLider);

  const getDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

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
          {!!activeRaffle?.leader && (
            <>
              <p className="font-bold text-[24px] text-gold text-center lg:text-start">
                Текущий Лидер
              </p>

              <div className="flex flex-col bg-white rounded-[5px] p-5 text-black">
                <p className="font-semibold text-[24px]  mb-6">
                  {activeRaffle?.leader.news.author.name}
                </p>

                <div className="flex flex-col gap-4 mb-5">
                  <div className="flex gap-7 border-b border-[#E1E1E1] pb-4">
                    <p className="w-[50%] font-normal text-[17px] ">
                      Количество оценок:
                    </p>
                    <p className="w-[50%] font-bold text-[17px] flex gap-1 items-center justify-end lg:justify-normal">
                      <HeartIcon />
                      {Number(activeRaffle?.leader.likes_count)}
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
                  {getDaysLeft(activeRaffle.raffle.ends_at)} дней до итогов 🔥
                </p>
              </div>
            </>
          )}

          {!!activePrize && (
            <>
              <p className="font-bold text-[24px] text-gold text-center lg:text-start">
                Текущий приз
              </p>

              <Link
                href={`/product/${activePrize.product.slug}`}
                className="flex flex-col items-center gap-[11px] bg-white rounded-[5px] pt-[34px] pb-[25px] text-black"
              >
                <Image
                  src={
                    !!activePrize.product.photo_path
                      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${activePrize.product.photo_path}`
                      : "/icons/logo-gray.svg"
                  }
                  width={276}
                  height={238}
                  alt="prize"
                  className="object-contain w-[276px] h-[238px]"
                />
                <p className="text-[24px] font-semibold w-[272px] text-center">
                  {activePrize.product.name}
                </p>
              </Link>
            </>
          )}
        </div>

        <div className="col-span-12  lg:col-span-6 lg:col-start-7 flex flex-col gap-[30px]">
          {news?.data.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} token={token} />
          ))}
          <Pagination totalPages={news?.last_page || 1} currentPage={page} />
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
