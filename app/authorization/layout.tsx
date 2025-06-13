import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({ url: "authorization" });
  const seoEmpty = !Object.keys(seo).length;

  return {
    title: seoEmpty ? "Авторизация" : seo.title,
    description: seoEmpty ? "Авторизация" : seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/authorization`,
    },
  };
}

export default async function AuthorizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
