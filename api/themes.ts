import { Theme } from "@/types/theme";

export async function getActiveTheme() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/weather-themes/active`;
  const res = await fetch(url, { cache: "no-store" });

  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Theme | undefined };

  return data;
}
