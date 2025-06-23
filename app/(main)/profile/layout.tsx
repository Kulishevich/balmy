import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({ url: "privacy-policy" });
  const seoEmpty = !Object.keys(seo).length;

  return {
    title: seoEmpty ? "Профиль" : seo.title,
    description: seoEmpty ? "Профиль" : seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/privacy-policy`,
    },
  };
}

export default async function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
