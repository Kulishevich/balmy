import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { generateSeoProduct } from "@/utils/helper";
import { getProductBySlug } from "@/api/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: productSlug } = await params;
  const { seo } = await getSeoTags({
    url: `product/${productSlug}`,
  });
  const product = await getProductBySlug("4");
  const { title, description } = generateSeoProduct(
    product?.name,
    product?.discountPrices
  );

  return {
    title: seo.title || title,
    description: seo.description || description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
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
