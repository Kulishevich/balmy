import "@/styles/globals.css";
import type { Metadata } from "next";
import { getSeoTags } from "@/api/seo";
import { config } from "@/utils/config";
import { AuthGuard } from "@/components/auth-guard";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoTags("/profile/personal-data");

  return {
    title: seo?.title || "Персональные данные",
    description: seo?.description || "Персональные данные",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: config.homeUrl,
    },
    alternates: {
      canonical: `${config.homeUrl}/profile/personal-data`,
    },
  };
}

export default async function PersonalDataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
