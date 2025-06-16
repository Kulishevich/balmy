import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({ url: "cart/delivery-payment" });
  const seoEmpty = !Object.keys(seo).length;

  return {
    title: seoEmpty ? "Доставка и оплата" : seo.title,
    description: seoEmpty ? "Доставка и оплата" : seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/cart/delivery-payment`,
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
