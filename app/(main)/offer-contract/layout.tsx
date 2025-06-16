import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({ url: "offer-contract" });
  const seoEmpty = !Object.keys(seo).length;

  return {
    title: seoEmpty ? "Договор оферты" : seo.title,
    description: seoEmpty ? "Договор оферты" : seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
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
