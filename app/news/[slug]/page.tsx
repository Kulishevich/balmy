import { getLastNews, getNewsBySlug } from "@/api/news";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import Image from "next/image";
import Link from "next/link";
import TallArrowRightIcon from "@/public/icons/tall-arrow-right.svg";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

async function NewsPage({ params }: Props) {
  const { slug: newsSlug } = await params;
  const { news } = await getNewsBySlug(newsSlug);
  const { news: lastNews } = await getLastNews(newsSlug);

  if (!news || !news.body) return notFound();

  const { title, subtitle, date, body } = news;

  return (
    <>
      <Title type="h1" className="container mt-10 text-center">
        {title}
      </Title>
      <Breadcrumbs
        className="mt-4 mx-auto"
        dynamicPath={{
          name: title || "",
          href: `/news/${newsSlug}`,
        }}
      />
      <p className="mt-4 max-w-[850px] mx-auto text-center text-[19px] font-normal">
        {subtitle}
      </p>
      <span className="mt-4 block w-max mx-auto bg-dark-gray text-white py-2 px-3 leading-none rounded-[50px] top-5 left-5 text-[18px]">
        {date}
      </span>
      <div className="mt-10 container flex flex-col xl:flex-row justify-between">
        <article
          className="article max-w-[850px] w-full"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="mt-[72px] xl:mt-0 xl:max-w-[300px] w-full">
          <h2 className="text-[28px] sm:text-[36px] font-extrabold sm:font-bold text-center">
            Последние новости
          </h2>
          <div className="mt-9 flex flex-col gap-6">
            {lastNews.map((news, idx) => {
              const { title, subtitle, images, date, slug } = news;
              return (
                <Link className="news-item" href={`/news/${slug}`} key={idx}>
                  <div className="news-item__image-wrapper">
                    <Image
                      className="object-cover"
                      src={images[0]}
                      alt={title.toLowerCase()}
                      fill
                    />
                  </div>
                  <div className="news-item__content">
                    <h3 className="news-item__title line-clamp-2">{title}</h3>
                    <p className="news-item__subtitle line-clamp-2">
                      {subtitle}
                    </p>
                    <span className="news-item__more">
                      Подробнее <TallArrowRightIcon />
                    </span>
                    <span className="news-item__date">{date}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsPage;
