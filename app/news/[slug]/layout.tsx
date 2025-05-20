import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getNewsBySlug } from "@/api/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: newsSlug } = await params;
  const { seo } = await getSeoTags({
    url: `news/${newsSlug}`,
  });
  const { news } = await getNewsBySlug(newsSlug);
  const { title, subtitle } = news;

  return {
    title: seo.title || title,
    description: seo.description || subtitle,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: config.homeUrl,
    },
    alternates: { canonical: `${config.homeUrl}/news/${newsSlug}` },
  };
}

export default async function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
