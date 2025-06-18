import { getProducts } from "@/api/products";
import { ProductItem } from "@/types/product";
import { IFuseOptions } from "fuse.js";
import cn from "clsx";
import SearchWrapper from "./wrapper";

interface Props {
  className?: string;
}

const searchOptions: IFuseOptions<ProductItem> = {
  keys: [
    { name: "name", weight: 0.1 },
    { name: "brand", weight: 0.2 },
    { name: "article", weight: 0.3 },
  ],
  includeScore: true,
};

async function Search({ className }: Props) {
  const products = await getProducts();

  return (
    <div className={cn("relative 2xl:max-w-[572px] w-full", className)}>
      <SearchWrapper searchOptions={searchOptions} products={products?.data} />
    </div>
  );
}

export default Search;
