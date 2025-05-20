import { Direction } from "@/store/filter";
import { Product } from "@/types/product";
import { config } from "@/utils/config";
import { calculateDiscountedPrice, slugifyWithOpts } from "@/utils/helper";

export async function getProducts() {
  const res = await fetch(`${config.apiUrl}/products`, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const products = data.map((product) => ({
    ...product,
    images: product.images
      .filter(Boolean)
      .map((url) => "https://balmy.by" + url),
    categorySlug: slugifyWithOpts(product.categoryId),
    discountPrices: calculateDiscountedPrice(
      product.salePrices,
      product.discount
    ),
    slug: slugifyWithOpts(product.name),
  }));

  return {
    products,
  };
}

export async function getProductBySlug(productSlug: string) {
  const res = await fetch(`${config.apiUrl}/products`, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const products = data.map((product) => ({
    ...product,
    images: product.images
      .filter(Boolean)
      .map((url) => "https://balmy.by" + url),
    categorySlug: slugifyWithOpts(product.categoryId),
    discountPrices: calculateDiscountedPrice(
      product.salePrices,
      product.discount
    ),
    slug: slugifyWithOpts(product.name),
  }));

  const product = products.find((product) => product.slug === productSlug);

  return {
    product,
  };
}

export async function getPopularProducts() {
  const res = await fetch(`${config.apiUrl}/products/popular`, {
    cache: "no-store",
  });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const popularProducts = data.map((product) => ({
    ...product,
    images: product.images
      .filter(Boolean)
      .map((url) => "https://balmy.by" + url),
    discountPrices: calculateDiscountedPrice(
      product.salePrices,
      product.discount
    ),
    slug: slugifyWithOpts(product.name),
  }));

  return { popularProducts };
}

export async function getProductsByCategoryId({
  categoryId = "",
  brand = "",
  page = "1",
  size = "16",
  sort = "name",
  direction = "asc",
  discounts = false,
}: {
  categoryId?: string;
  brand?: string;
  page?: string;
  size?: string;
  sort?: string;
  direction?: Direction;
  discounts?: boolean;
}) {
  if (discounts) {
    return getDiscountProducts({
      page,
      size,
      sort,
      direction,
      brand,
    });
  }

  let url = ``;

  if (brand) {
    url = `${
      config.apiUrl
    }/products/cat-brand?category_id=${categoryId}&brand=${brand}&page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  } else {
    url = `${config.apiUrl}/products/category?category_id=${categoryId}&page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const totalPages = Object.keys(data)[0];
  const products = Object.values(data)
    .flat()
    .map((product) => ({
      ...product,
      images: product.images
        .filter(Boolean)
        .map((url) => "https://balmy.by" + url),
      discountPrices: calculateDiscountedPrice(
        product.salePrices,
        product.discount
      ),
      slug: slugifyWithOpts(product.name),
    }));

  return { totalPages, products };
}

export async function getProductsBySubcategoryId({
  brand = "",
  subcategoryId = "",
  category = "",
  page = "1",
  size = "16",
  sort = "name",
  direction = "asc",
}: {
  brand?: string;
  subcategoryId?: string;
  category?: string;
  page?: string;
  size?: string;
  sort?: string;
  direction?: Direction;
}) {
  if (category == "sets") {
    return getProductsByBrand({
      brand: subcategoryId,
      page,
      size,
      sort,
      direction,
    });
  }

  let url = ``;

  if (brand) {
    url = `${
      config.apiUrl
    }/products/sub-brand?subcategory_id=${subcategoryId}&brand=${brand}&page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  } else {
    url = `${
      config.apiUrl
    }/products/subcategory?subcategory_id=${subcategoryId}&page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const totalPages = Object.keys(data)[0];
  const products = Object.values(data)
    .flat()
    .map((product) => ({
      ...product,
      images: product.images
        .filter(Boolean)
        .map((url) => "https://balmy.by" + url),
      discountPrices: calculateDiscountedPrice(
        product.salePrices,
        product.discount
      ),
      slug: slugifyWithOpts(product.name),
    }));

  return { totalPages, products };
}

export async function getSimilarProducts({
  currentProductCategorySlug,
  currentProductSlug,
}: {
  currentProductCategorySlug: string;
  currentProductSlug: string;
}) {
  const { products } = await getProducts();

  const similarProducts = products
    .filter(
      (product) =>
        product.categorySlug === currentProductCategorySlug &&
        product.slug !== currentProductSlug
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return { similarProducts };
}

async function getProductsByBrand({
  brand = "",
  page = "1",
  size = "16",
  sort = "name",
  direction = "asc",
}: {
  brand?: string;
  page?: string;
  size?: string;
  sort?: string;
  direction?: "asc" | "desc";
}) {
  const url = `${config.apiUrl}/products/brand?brand=${brand}&page=${
    +page - 1
  }&size=${size}&sort=${sort}&direction=${direction}`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const totalPages = Object.keys(data)[0];
  const products = Object.values(data)
    .flat()
    .map((product) => ({
      ...product,
      images: product.images
        .filter(Boolean)
        .map((url) => "https://balmy.by" + url),
      slug: slugifyWithOpts(product.name),
      discountPrices: calculateDiscountedPrice(
        product.salePrices,
        product.discount
      ),
    }));

  return { totalPages, products };
}

async function getDiscountProducts({
  page = "1",
  size = "16",
  sort = "name",
  direction = "asc",
  brand = "",
}: {
  page?: string;
  size?: string;
  sort?: string;
  brand?: string;
  direction?: "asc" | "desc";
}) {
  let url = "";

  if (brand) {
    url = `${config.apiUrl}/products/discount?brand=${brand}&page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  } else {
    url = `${config.apiUrl}/products/discount-default?page=${
      +page - 1
    }&size=${size}&sort=${sort}&direction=${direction}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const data: Product[] = await clonedResponse.json();

  const totalPages = Object.keys(data)[0];
  const products = Object.values(data)
    .flat()
    .map((product) => ({
      ...product,
      images: product.images
        .filter(Boolean)
        .map((url) => "https://balmy.by" + url),
      slug: slugifyWithOpts(product.name),
      discountPrices: calculateDiscountedPrice(
        product.salePrices,
        product.discount
      ),
    }));

  return { totalPages, products };
}
