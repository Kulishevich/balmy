import { Product } from "./product";

export interface SearchResult {
  item: Product;
  refIndex: number;
  score?: number;
}
