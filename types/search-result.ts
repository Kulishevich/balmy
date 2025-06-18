import { ProductItem } from "./product";

export interface SearchResult {
  item: ProductItem;
  refIndex: number;
  score?: number;
}
