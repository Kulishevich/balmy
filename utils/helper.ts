import { getProductBySlug } from "@/api/products";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Dispatch, SetStateAction } from "react";
import slugify from "slugify";

export function slugifyWithOpts(name: string) {
  return slugify(name, { lower: true, remove: /[^\w\s-]/g, locale: "ru" });
}

export function getPaginationPages({
  totalPages,
  currentPage,
  paginationPages = 5,
}: {
  totalPages: number;
  currentPage: number;
  paginationPages?: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const mid = (paginationPages - 1) / 2;

  if (totalPages <= paginationPages) {
    return pages;
  }

  if (currentPage >= totalPages - mid) {
    const start = totalPages - paginationPages;
    const end = totalPages;

    return pages.slice(start, end);
  }

  if (currentPage >= paginationPages - 1) {
    const start = currentPage - paginationPages + mid;
    const end = currentPage + mid;

    return pages.slice(start, end);
  }

  return pages.slice(0, paginationPages);
}

export function formatTimestampToDDMMYYYY(
  timestamp: number | string | undefined
) {
  if (timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return "";
}

export async function handleCategoryChangePath({
  pathname,
  categories,
  setActiveCategorySlug,
}: {
  pathname: string;
  categories: Category[];
  setActiveCategorySlug: Dispatch<SetStateAction<string>>;
}) {
  if (pathname.includes("/product")) {
    const productSlug = pathname.split("/")[2];
    const product = await getProductBySlug(productSlug);

    setActiveCategorySlug(product?.slug || "");
  }

  if (pathname.includes("/catalog")) {
    const categorySlug = pathname.split("/")[2];
    const category = categories.find(
      (category) => category.slug == categorySlug
    );

    setActiveCategorySlug(category?.slug || "");
  }
}

export function getCartProductFromProduct(product: Product) {
  const { id, slug, photo_path, name, discount, price } = product;

  return {
    id,
    slug: slug!,
    image: photo_path,
    name,
    price: +price,
    basePrice: +price,
    discount: +discount,
    discountPrices: (Number(price) * (100 - Number(discount))) / 100,
    quantity: 1,
  };
}

export function preventScroll(condition: boolean): void {
  const $body = document.querySelector("body")!;
  $body.style.overflow = condition ? "hidden" : "auto";
}

export function getDeclensionForGoods(count: number): string {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return "товаров";
  }

  if (remainder10 === 1) {
    return "товар";
  }

  if (remainder10 >= 2 && remainder10 <= 4) {
    return "товара";
  }

  return "товаров";
}

export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
) {
  return originalPrice - (originalPrice * discountPercentage) / 100;
}

export function generateSeoProduct(name?: string, price?: number) {
  if (!name || !price) {
    return {
      title: "",
      description: "",
    };
  }

  return {
    title: `${name} купить в Минске, цена`,
    description: `${name} по доступной цене в каталоге balmy.by. Большой ассортимент, качественные товары, помощь с выбором. Звоните`,
  };
}
