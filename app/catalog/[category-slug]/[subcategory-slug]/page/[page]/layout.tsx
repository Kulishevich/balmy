import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getSubcategory } from "@/api/subcategory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    "category-slug": string;
    "subcategory-slug": string;
    page: string;
  }>;
}): Promise<Metadata> {
  const searchParams = await params;
  const categorySlug = searchParams["category-slug"];
  const subcategorySlug = searchParams["subcategory-slug"];
  const { seo } = await getSeoTags({
    url: `catalog/${categorySlug}/${subcategorySlug}`,
  });

  const { subcategory } = await getSubcategory(subcategorySlug);

  return {
    title: seo.title || subcategory?.subcategoryName,
    description: seo.description || subcategory?.subcategoryName,
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
