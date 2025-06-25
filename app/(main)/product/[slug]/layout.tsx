import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { getProductBySlug } from "@/api/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: productSlug } = await params;
  const seo = await getSeoTags(`/product/${productSlug}`);
  const product = await getProductBySlug("4");

  return {
    title: seo.title || product.name,
    description: seo.description || product.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: config.homeUrl,
    },
    alternates: { canonical: `${config.homeUrl}/product/${productSlug}` },
  };
}

export default async function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
