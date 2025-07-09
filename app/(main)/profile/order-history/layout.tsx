import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { AuthGuard } from "@/components/auth-guard";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/profile/order-history");

  return {
    title: seo?.title || "История заказов",
    description: seo?.description || "История заказов",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/profile/order-history`,
    },
  };
}

export default async function OrderHistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
