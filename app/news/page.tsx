import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import Image from "next/image";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";
import cn from "clsx";
import Link from "next/link";
import { getNews } from "@/api/news";
import Pagination from "@/components/pagination";

interface Props {
  params: Promise<{ page: string }>;
}

async function NewsPage({ params }: Props) {
  const { page } = await params;
  const { news, totalPages } = await getNews({ page });

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Новости
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="mt-10 news container">
        {news.map((news, idx) => {
          const { title, subtitle, images, date, slug } = news;
          const isBig = idx === 0 || (idx + 1) % 8 === 0;
          const isMedium = (idx + 1) % 4 === 0 || (idx + 1) % 7 === 0;
          const number = (idx % 8) + 1;

          return (
            <Link
              className={cn(`news-item news__item-${number}`, {
                "news-item--big": isBig,
                "news-item--medium": !isBig && isMedium,
              })}
              href={`/news/${slug}`}
              key={idx}
            >
              <div className="news-item__image-wrapper">
                <Image
                  className="object-cover"
                  src={images[0]}
                  alt={title.toLowerCase()}
                  fill
                />
              </div>
              <div className="news-item__content">
                <p className="news-item__title line-clamp-2">{title}</p>
                <p className="news-item__subtitle line-clamp-2">{subtitle}</p>
                <span className="news-item__more">
                  Подробнее <TallArrowRightIcon />
                </span>
                <span className="news-item__date">{date}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </>
  );
}

export default NewsPage;
