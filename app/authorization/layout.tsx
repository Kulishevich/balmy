import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/authorization");

  return {
    title: seo.title || "Авторизация",
    description: seo.description || "Авторизация",
    keywords: seo.keywords,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
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
