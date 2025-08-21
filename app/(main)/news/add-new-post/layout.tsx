import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/news/add-news-post");

  return {
    title: seo?.title || "Добавить новость",
    description: seo?.description || "Добавить новость",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: config.homeUrl,
    },
    alternates: { canonical: `${config.homeUrl}/news/add-new-post` },
  };
}

export default async function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
