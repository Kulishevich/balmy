import { Brand } from "@/types/brand";
import { config } from "@/utils/config";
import { slugifyWithOpts } from "@/utils/helper";

export async function getBrands() {
  const res = await fetch(`${config.apiUrl}/brands`, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Brand[] = await clonedResponse.json();

  const brands = data.map((brand) => {
    const { id } = brand;

    return {
      id,
      subcategoryName: id,
      slug: slugifyWithOpts(id),
    };
  });

  return { brands };
}
