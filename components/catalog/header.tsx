import Breadcrumbs, { DynamicPath } from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories?: Brand[] };
  subcategory?: Category | Brand;
  subsubcategory?: Category;
}

async function CatalogHeader({ category, subcategory, subsubcategory }: Props) {
  const dynamicPath = [
    category && {
      href: `/catalog/${category.slug}`,
      name: category.name || "",
    },
    category &&
      subcategory && {
        href: `/catalog/${category.slug}/${subcategory.slug}`,
        name: subcategory.name || "",
      },
    category &&
      subcategory &&
      subsubcategory && {
        href: `/catalog/${category.slug}/${subcategory.slug}/${subsubcategory.slug}`,
        name: subsubcategory.name || "",
      },
  ].filter(Boolean) as DynamicPath[];

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        {subcategory ? subcategory.name : category?.name}
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" dynamicPath={dynamicPath} />
    </>
  );
}

export default CatalogHeader;
