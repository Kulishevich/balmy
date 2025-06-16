import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoTags({
    url: "contacts",
  });

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
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
