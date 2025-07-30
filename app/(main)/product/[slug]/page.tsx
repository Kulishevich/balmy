import { getProductBySlug, getSimilarProducts } from "@/api/products";
import { notFound } from "next/navigation";
import ProductLayout from "@/components/product/layout";
import { getContacts } from "@/api/contacts";

interface Props {
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: Props) {
  const { slug: productSlug } = await params;
  const { social_links } = await getContacts();
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts({
    currentProductSlug: product.slug,
    currentProductCategorySlug: product.category.slug,
  });

  return (
    <ProductLayout
      product={product}
      similarProducts={similarProducts}
      socialLinks={social_links}
    />
  );
}

export default ProductPage;
