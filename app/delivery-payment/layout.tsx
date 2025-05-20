import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({ url: "delivery-payment" });
  const seoEmpty = !Object.keys(seo).length;

  return {
    title: seoEmpty ? "Доаставка и оплата" : seo.title,
    description: seoEmpty ? "Доаставка и оплата" : seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/delivery-payment`,
    },
  };
}

export default async function DeliveryPaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
