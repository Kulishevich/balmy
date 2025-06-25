import { SEO } from "@/types/seo";

export async function getSeoTags(tag: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/tag?name=${tag}`;

  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const seo: SEO = await clonedResponse.json();

  return seo;
}
