import { SEO } from "@/types/seo";
import { config } from "@/utils/config";

export async function getSeoTags({ url: searchUrl = "" }: { url?: string }) {
  const url = `${config.seoUrl}/tags?url=${config.homeUrl}/${searchUrl}`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const seo: SEO = await clonedResponse.json();

  return {
    seo,
  };
}
