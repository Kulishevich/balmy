import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getCategory } from "@/api/category";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "category-slug": string }>;
}): Promise<Metadata> {
  const searchParams = await params;
  const categorySlug = searchParams["category-slug"];

  const seo = await getSeoTags(`/catalog/${categorySlug}`);

  const category = await getCategory("1");

  return {
    title: seo.title || category?.name,
    description: seo.description || category?.name,
    keywords: seo.keywords,
    alternates: {
      canonical: `${config.homeUrl}/catalog/${categorySlug}`,
    },
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: config.homeUrl,
    },
  };
}

export default async function SubcategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
