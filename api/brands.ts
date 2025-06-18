import { Brand } from "@/types/brand";
// import { config } from "@/utils/config";
// import { slugifyWithOpts } from "@/utils/helper";

export async function getBrands() {
  const res = await fetch(`https://balmy.webspaceteam.site/api/v1/brands`, {
    cache: "no-store",
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Brand[] };

  return data;
}
