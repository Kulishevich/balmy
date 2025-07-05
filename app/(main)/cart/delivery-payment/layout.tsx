import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/cart/delivery-payment");

  return {
    title: seo?.title || "Доставка и оплата",
    description: seo?.description || "Доставка и оплата",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
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
