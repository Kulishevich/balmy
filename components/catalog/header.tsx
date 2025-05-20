import { getCategory } from "@/api/category";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";

interface Props {
  categorySlug: string;
  subcategorySlug?: string;
  subcategoryName?: string;
}

async function CatalogHeader({
  categorySlug,
  subcategoryName,
  subcategorySlug,
}: Props) {
  const { category } = await getCategory(categorySlug);
  const isDiscounts = categorySlug === "discounts";
  const dynamicPath = subcategoryName
    ? [
        {
          href: `/catalog/${category?.slug}`,
          name: category?.id || "",
        },
        {
          href: `/catalog/${category?.slug}/${subcategorySlug}`,
          name: subcategoryName || "",
        },
      ]
    : {
        href: `/catalog/${category?.slug}`,
        name: isDiscounts ? "Скидки" : category?.id || "",
      };

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        {isDiscounts
          ? "Скидки"
          : subcategoryName
          ? subcategoryName
          : category?.id}
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" dynamicPath={dynamicPath} />
    </>
  );
}

export default CatalogHeader;
