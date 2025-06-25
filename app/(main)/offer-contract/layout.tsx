import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/offer-contract");

  return {
    title: seo.title || "Договор оферты",
    description: seo.description || "Договор оферты",
    keywords: seo.keywords,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/offer-contract`,
    },
  };
}

export default async function OfferContractLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
