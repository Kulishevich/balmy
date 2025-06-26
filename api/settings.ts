import { Settings } from "@/types/settings";

export async function getSettings() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/design/settings`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Settings };

  return data;
}
