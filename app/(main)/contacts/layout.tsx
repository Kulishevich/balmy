import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/contacts");

  return {
    title: seo.title || "Контакты",
    description: seo.description || "Контакты",
    keywords: seo.keywords,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/contacts`,
    },
  };
}

export default async function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
