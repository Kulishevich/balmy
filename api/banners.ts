import { Banner } from "@/types/banner";

export async function getBanners() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
    next: { revalidate: 60 },
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Banner[] };

  return data;
}
