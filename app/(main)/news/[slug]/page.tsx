import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { getAllPostsWithoutPagination, getPostById } from "@/api/posts";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OtherNewsCard } from "@/components/news/other-news-card";
import { getMe } from "@/api/auth";

interface Props {
  params: Promise<{ slug: string }>;
}

async function NewsPage({ params }: Props) {
  const { slug: newsId } = await params;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  if (!token) {
    redirect("/authorization");
  }

  const newsData = await getPostById(newsId);
  const news = await getAllPostsWithoutPagination({ token });
  const me = await getMe(token);

  if (!newsData) {
    notFound();
  }

  const otherNews = news?.data
    ?.filter(
      (elem) =>
        elem.author_client_id === String(me?.id) && elem.id !== newsData?.id
    )
    .slice(0, 2);

  const { title, content, subtitle, published_at } = newsData;

  return (
    <div className="container items-center">
      <Title type="h1" className="mt-10 text-center">
        {title}
      </Title>
      <Breadcrumbs
        className="mt-6 mx-auto"
        dynamicPath={{
          href: `/news/${newsData.id}`,
          name: newsData.title,
        }}
      />
      {}
      <p className="mt-[16px] text-center font-normal text-[17px] mb-[11px] mx-auto max-w-[850px]">
        {subtitle}
      </p>
      <p className="bg-gold w-fit py-[2px] px-[10px] mb-[45px] rounded-[14px] mx-auto">
        {new Date(published_at || "").toLocaleDateString("RU-ru")}
      </p>

      <div className="grid grid-cols-12 xl:gap-[30px] w-full">
        <div
          className="col-span-12  lg:col-span-8  flex flex-col gap-3 content-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="col-span-12  lg:col-span-3 lg:col-start-10 flex flex-col ">
          <p className="text-[28px] xl:text-[36px] font-bold text-center mb-9">
            Другие новости этого автора
          </p>

          <div className="flex flex-col gap-5 xl:gap-6">
            {otherNews?.map((newsItem) => (
              <OtherNewsCard {...newsItem} key={newsItem.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
