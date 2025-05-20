export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  brand: string;
  quantity: number;
  salePrices: number;
  discountPrices: number;
  country: string;
  article: string;
  volume: number;
  discount: number;
  video: null | string;
  categoryId: string;
  categorySlug?: string;
  popular: boolean;
  images: string[];
}

export interface CartProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  basePrice: number;
  discountPrices: number;
  discount: number;
  quantity: number;
  image: string;
}
