import { Settings } from "@/types/settings";

export async function getSettings() {
  const url = `https://balmy.webspaceteam.site/api/v1/design/settings`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Settings };

  return data;
}
