import { Sale } from "@/types/sale";
import { config } from "@/utils/config";

export async function getSales() {
  const res = await fetch(`${config.apiUrl}/sales/all`, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Sale[] = await clonedResponse.json();

  const sales = data.map((product) => ({
    ...product,
    images: product.images
      .filter(Boolean)
      .map((url) => "https://balmy.by" + url),
  }));

  return { sales };
}
