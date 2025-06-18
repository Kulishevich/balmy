import {
  getProductBySlug,
  // getProducts,
  getSimilarProducts,
} from "@/api/products";
import { notFound } from "next/navigation";
import ProductLayout from "@/components/product/layout";

interface Props {
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: Props) {
  const { slug: productSlug } = await params;
  const id = productSlug.split("_").findLast((elem) => elem) || "";
  const product = await getProductBySlug(id);

  // if (!product) {
  //   const { products } = await getProducts();
  //   const foundProduct = products.find((elem) => elem.id === productSlug);

  //   if (foundProduct?.slug) {
  //     redirect(`/product/${foundProduct.slug}`);
  //   } else {
  //     redirect("/404");
  //   }
  // }

  if (!product) {
    notFound();
  }

  const { similarProducts } = await getSimilarProducts({
    currentProductSlug: product.slug,
    currentProductCategorySlug: product.slug,
  });

  return <ProductLayout product={product} similarProducts={similarProducts} />;
}

export default ProductPage;
