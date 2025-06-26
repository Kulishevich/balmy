import { Direction } from "@/store/filter";
import { Product, ProductResponse } from "@/types/product";

export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as {
    data: ProductResponse;
  };

  return data;
}

export async function getProductBySlug(productSlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}`,
    {
      next: { revalidate: 60 },
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
    `${process.env.NEXT_PUBLIC_API_URL}/products/popular`,
    {
      next: { revalidate: 60 },
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

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/products?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
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
