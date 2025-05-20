import { News } from "@/types/news";
import { config } from "@/utils/config";
import { formatTimestampToDDMMYYYY, slugifyWithOpts } from "@/utils/helper";

export async function getNews({
  page = "1",
  size = "8",
  sort = "date",
  direction = "DESC",
}: {
  page?: string;
  size?: string;
  sort?: string;
  direction?: "ASC" | "DESC";
}) {
  const url = `${config.apiUrl}/news?page=${+page - 1}&size=${size}&sort=${sort}&direction=${direction}&includeBody=false`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: News[] = await clonedResponse.json();
  const totalPages = Object.keys(data)[0];

  const news = Object.values(data)
    .flat()
    .map(({ body, ...news }) => ({
      ...news,
      slug: slugifyWithOpts(news.title),
      date: formatTimestampToDDMMYYYY(news.date),
      images: news.images
        .filter(Boolean)
        .map((url) => `https://balmy.by${url}`),
    }));

  return { totalPages, news };
}

export async function getNewsBySlug(newsSlug: string) {
  const res = await fetch(
    `${config.apiUrl}/news?page=0&size=0&sort=date&direction=ASC&includeBody=false`,
    { cache: "no-store" },
  );
  const clonedResponse = res.clone();
  const data: News[] = await clonedResponse.json();

  const news = Object.values(data)
    .flat()
    .map((news) => ({
      ...news,
      images: news.images
        .filter(Boolean)
        .map((url) => "https://balmy.by" + url),
      date: formatTimestampToDDMMYYYY(news.date),
      slug: slugifyWithOpts(news.title),
    }));

  const foundNewsWithoutBody = news.find((news) => news.slug === newsSlug);
  const resNews = await fetch(
    `${config.apiUrl}/news/${foundNewsWithoutBody?.id}`,
    { cache: "no-store" },
  );
  const clonedResponseNews = resNews.clone();
  const foundNews: News = await clonedResponseNews.json();

  return {
    news: { ...foundNewsWithoutBody, body: foundNews.body },
  };
}

export async function getLastNews(currentNewsSlug: string) {
  const url = `${config.apiUrl}/news?page=0&size=0&sort=date&direction=ASC&includeBody=false`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: News[] = await clonedResponse.json();
  const totalPages = Object.keys(data)[0];

  const news = Object.values(data)
    .flat()
    .map(({ body, ...news }) => ({
      ...news,
      slug: slugifyWithOpts(news.title),
      date: formatTimestampToDDMMYYYY(news.date),
      images: news.images
        .filter(Boolean)
        .map((url) => `https://balmy.by${url}`),
    }))
    .filter((news) => news.slug !== currentNewsSlug);

  return { totalPages, news: news.length > 2 ? news.slice(0, 2) : news };
}
