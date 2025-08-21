import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getPostById } from "@/api/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: newsId } = await params;
  const newsData = await getPostById(newsId);

  const seo = await getSeoTags("/news");

  return {
    title: seo?.title || newsData?.title,
    description: seo?.description || newsData?.content,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title || newsData?.title,
      description: seo?.og_description || newsData?.title,
      url: config.homeUrl,
    },
    alternates: { canonical: `${config.homeUrl}/news/${newsData?.id}` },
  };
}

export default async function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
