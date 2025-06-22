import { Banner } from "@/types/banner";

export async function getBanners() {
  const res = await fetch(`https://balmy.webspaceteam.site/api/v1/banners`, {
    cache: "no-store",
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Banner[] };

  return data;
}
