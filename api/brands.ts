import { Brand } from "@/types/brand";

export async function getBrands() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
    next: { revalidate: 60 },
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data?: Brand[] };

  return data;
}
