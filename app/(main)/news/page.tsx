import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { NewsCard } from "@/components/news/news-card";

async function NewsPage() {
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Лента новостей
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="mt-10 container grid grid-cols-2 gap-x-[35px] gap-y-[30px]">
        {new Array(4).fill("").map((_, idx) => {
          return <NewsCard key={idx} />;
        })}
      </div>
      <Suspense
        fallback={
          <p className="text-[21px] leading-[29px] text-center w-full">
            Загрузка...
          </p>
        }
      >
        <Pagination totalPages={5} currentPage={"1"} />
      </Suspense>
    </>
  );
}

export default NewsPage;
