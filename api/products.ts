import { Direction } from "@/store/filter";
import { Product, ProductResponse } from "@/types/product";
// import { config } from "@/utils/config";
// import { calculateDiscountedPrice, slugifyWithOpts } from "@/utils/helper";

export async function getProducts() {
  const res = await fetch(`https://balmy.webspaceteam.site/api/v1/products`, {
    cache: "no-store",
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as {
    data: ProductResponse;
  };

  return data;
}

export async function getProductBySlug(productSlug: string) {
  const res = await fetch(
    `https://balmy.webspaceteam.site/api/v1/products/${productSlug}`,
    {
      cache: "no-store",
    }
  );
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as {
    data: Product;
  };

  return data;
}

export async function getPopularProducts() {
  const res = await fetch(
    `https://balmy.webspaceteam.site/api/v1/products/popular`,
    {
      cache: "no-store",
    }
  );
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as {
    data: Product[];
  };

  return data;
}

export async function getProductsByCategoryId({
  category_slug = "",
  brand = "",
  page = "1",
  per_page = "16",
  sort_by = "name",
  sort_direction = "asc",
  brand_slug = "",
  on_sale = false,
}: {
  category_slug?: string;
  brand?: string;
  brand_slug?: string;
  page?: string;
  per_page?: string;
  sort_by?: string;
  sort_direction?: Direction;
  on_sale?: boolean;
}) {
  const params = new URLSearchParams();

  if (category_slug) {
    params.append("category_slug", category_slug);
  }
  if (brand_slug) {
    params.append("brand_slug", brand_slug);
  }
  if (brand) {
    params.append("brand", brand);
  }
  if (page) {
    params.append("page", page);
  }
  if (per_page) {
    params.append("per_page", per_page);
  }
  if (sort_by) {
    params.append("sort_by", sort_by);
  }
  if (sort_direction) {
    params.append("sort_direction", sort_direction);
  }

  if (on_sale) {
    params.append("on_sale", String(on_sale));
  }

  const url = `https://balmy.webspaceteam.site/api/v1/products?${params.toString()}`;
  console.log(url);
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as {
    data: ProductResponse;
  };

  return data;
}

export async function getSimilarProducts({
  currentProductCategorySlug,
  currentProductSlug,
}: {
  currentProductCategorySlug: string;
  currentProductSlug: string;
}) {
  const products = await getProducts();

  const similarProducts = products.data
    .filter(
      (product) =>
        product.category.slug === currentProductCategorySlug &&
        product.slug !== currentProductSlug
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return { similarProducts };
}

// export async function getProductsBySubcategoryId({
//   brand = "",
//   subcategoryId = "",
//   category = "",
//   page = "1",
//   size = "16",
//   sort = "name",
//   direction = "asc",
// }: {
//   brand?: string;
//   subcategoryId?: string;
//   category?: string;
//   page?: string;
//   size?: string;
//   sort?: string;
//   direction?: Direction;
// }) {
//   if (category == "sets") {
//     return getProductsByBrand({
//       brand: subcategoryId,
//       page,
//       size,
//       sort,
//       direction,
//     });
//   }

//   let url = ``;

//   if (brand) {
//     url = `${
//       config.apiUrl
//     }/products/sub-brand?subcategory_id=${subcategoryId}&brand=${brand}&page=${
//       +page - 1
//     }&size=${size}&sort=${sort}&direction=${direction}`;
//   } else {
//     url = `${
//       config.apiUrl
//     }/products/subcategory?subcategory_id=${subcategoryId}&page=${
//       +page - 1
//     }&size=${size}&sort=${sort}&direction=${direction}`;
//   }

//   const res = await fetch(url, { cache: "no-store" });
//   const clonedResponse = res.clone();
//   const data: Product[] = await clonedResponse.json();

//   const totalPages = Object.keys(data)[0];
//   const products = Object.values(data)
//     .flat()
//     .map((product) => ({
//       ...product,
//       images: product.images
//         .filter(Boolean)
//         .map((url) => "https://balmy.by" + url),
//       discountPrices: calculateDiscountedPrice(
//         product.salePrices,
//         product.discount
//       ),
//       slug: slugifyWithOpts(product.name),
//     }));

//   return { totalPages, products };
// }

// async function getProductsByBrand({
//   brand = "",
//   page = "1",
//   size = "16",
//   sort = "name",
//   direction = "asc",
// }: {
//   brand?: string;
//   page?: string;
//   size?: string;
//   sort?: string;
//   direction?: "asc" | "desc";
// }) {
//   const url = `${config.apiUrl}/products/brand?brand=${brand}&page=${
//     +page - 1
//   }&size=${size}&sort=${sort}&direction=${direction}`;
//   const res = await fetch(url, { cache: "no-store" });
//   const clonedResponse = res.clone();
//   const data: Product[] = await clonedResponse.json();

//   const totalPages = Object.keys(data)[0];
//   const products = Object.values(data)
//     .flat()
//     .map((product) => ({
//       ...product,
//       images: product.images
//         .filter(Boolean)
//         .map((url) => "https://balmy.by" + url),
//       slug: slugifyWithOpts(product.name),
//       discountPrices: calculateDiscountedPrice(
//         product.salePrices,
//         product.discount
//       ),
//     }));

//   return { totalPages, products };
// }

// async function getDiscountProducts({
//   page = "1",
//   size = "16",
//   sort = "name",
//   direction = "asc",
//   brand = "",
// }: {
//   page?: string;
//   size?: string;
//   sort?: string;
//   brand?: string;
//   direction?: "asc" | "desc";
// }) {
//   let url = "";

//   if (brand) {
//     url = `${config.apiUrl}/products/discount?brand=${brand}&page=${
//       +page - 1
//     }&size=${size}&sort=${sort}&direction=${direction}`;
//   } else {
//     url = `${config.apiUrl}/products/discount-default?page=${
//       +page - 1
//     }&size=${size}&sort=${sort}&direction=${direction}`;
//   }

//   const res = await fetch(url, { cache: "no-store" });
//   const clonedResponse = res.clone();
//   const data: Product[] = await clonedResponse.json();

//   const totalPages = Object.keys(data)[0];
//   const products = Object.values(data)
//     .flat()
//     .map((product) => ({
//       ...product,
//       images: product.images
//         .filter(Boolean)
//         .map((url) => "https://balmy.by" + url),
//       slug: slugifyWithOpts(product.name),
//       discountPrices: calculateDiscountedPrice(
//         product.salePrices,
//         product.discount
//       ),
//     }));

//   return { totalPages, products };
// }
