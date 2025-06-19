import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { Brand } from "@/types/brand";
import { Category } from "@/types/category";

interface Props {
  category:
    | Category
    | { id: string; slug: string; name: string; subcategories?: Brand[] };
  subcategory?: Category | Brand;
}

async function CatalogHeader({ category, subcategory }: Props) {
  const dynamicPath = subcategory
    ? [
        {
          href: `/catalog/${
            category?.slug !== "brands"
              ? `${category?.slug}_${category.id}`
              : `${category?.slug}`
          }`,
          name: category?.name || "",
        },
        {
          href: `/catalog/${
            category?.slug !== "brands"
              ? `${category?.slug}_${category.id}`
              : `${category.slug}`
          }/${subcategory.slug}_${subcategory.id}`,
          name: subcategory.name || "",
        },
      ]
    : {
        href: `/catalog/${
          category?.slug !== "brands"
            ? `${category?.slug}_${category.id}`
            : `${category?.slug}`
        }`,
        name: category?.name || "",
      };

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
