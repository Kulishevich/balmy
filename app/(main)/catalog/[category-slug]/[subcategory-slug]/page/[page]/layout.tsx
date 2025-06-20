import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getCategory } from "@/api/category";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    "category-slug": string;
    "subcategory-slug": string;
  }>;
}): Promise<Metadata> {
  const searchParams = await params;
  const categorySlug = searchParams["category-slug"];
  const subcategorySlug = searchParams["subcategory-slug"];
  const { seo } = await getSeoTags({
    url: `catalog/${categorySlug}/${subcategorySlug}`,
  });

  const subcategory = await getCategory(subcategorySlug);

  return {
    title: seo.title || subcategory?.name,
    description: seo.description || subcategory?.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${config.homeUrl}/catalog/${categorySlug}/${subcategorySlug}`,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
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
