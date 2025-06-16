import {
  getProductBySlug,
  getProducts,
  getSimilarProducts,
} from "@/api/products";
import { redirect } from "next/navigation";
import ProductLayout from "@/components/product/layout";

interface Props {
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: Props) {
  const { slug: productSlug } = await params;

  const { product } = await getProductBySlug(productSlug);
  if (!product) {
    const { products } = await getProducts();
    const foundProduct = products.find((elem) => elem.id === productSlug);

    if (foundProduct?.slug) {
      redirect(`/product/${foundProduct.slug}`);
    } else {
      redirect("/404");
    }
  }

  const { similarProducts } = await getSimilarProducts({
    currentProductSlug: product.slug,
    currentProductCategorySlug: product.categorySlug,
  });

  return <ProductLayout product={product} similarProducts={similarProducts} />;
}

export default ProductPage;
