import { SEO } from "@/types/seo";

export async function getSeoTags(tag: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/seo/tag?name=${tag}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const clonedResponse = res.clone();
    const seo: SEO = await clonedResponse.json();

    if (!res.ok) {
      return null;
    }

    return seo;
  } catch (err) {
    console.error("Ошибка при получении seo Данных:", err);

    return null;
  }
}
