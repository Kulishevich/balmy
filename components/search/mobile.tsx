import { getProducts } from "@/api/products";
import { Product } from "@/types/product";
import { IFuseOptions } from "fuse.js";
import cn from "clsx";
import SearchWrapperMobile from "./wrapper-mobile";

interface Props {
  className?: string;
}

const searchOptions: IFuseOptions<Product> = {
  keys: [
    { name: "name", weight: 0.1 },
    { name: "brand", weight: 0.2 },
    { name: "article", weight: 0.3 },
  ],
  includeScore: true,
};

async function SearchMobile({ className }: Props) {
  const products = await getProducts();

  return (
    <div className={cn("container relative lg:hidden", className)}>
      <SearchWrapperMobile searchOptions={searchOptions} products={products} />
    </div>
  );
}

export default SearchMobile;
