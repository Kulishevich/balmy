import Title from "../title";
import BeardBgImage from "@/public/images/beard-bg.webp";
import ShavingBgImage from "@/public/images/shaving-bg.webp";
import FaceBodyBgImage from "@/public/images/face-body-bg.webp";
import HairBgImage from "@/public/images/hair-bg.webp";
import AccessoryBgImage from "@/public/images/accessory-bg.webp";
import KitsBgImage from "@/public/images/kits-bg.webp";
import Link from "next/link";
import Image from "next/image";
import Action from "../action";
import { getCategories } from "@/api/category";
// import SectionAnimationWrapper from "../section-animation-wrapper";

const catalog = [
  { name: "Бренды", bg: BeardBgImage },
  { name: "Для бороды", bg: FaceBodyBgImage },
  { name: "Для волос и тела", bg: HairBgImage },
  { name: "Для бритья", bg: ShavingBgImage },
  { name: "Аксеcсуары", bg: AccessoryBgImage },
  { name: "Наборы", bg: KitsBgImage },
];

async function OurCatalogSection() {
  const { categories } = await getCategories();

  return (
    // <SectionAnimationWrapper>
    <section className="mt-[72px] lg:mt-[120px] container">
      <Title className="text-center">Наш каталог</Title>
      <div className="mt-6 lg:mt-[29px] grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] gap-y-4 lg:gap-y-[40px]">
        {categories.map((category) => {
          const { id: name, slug } = category;
          const alt = name.toLowerCase();
          const categorySlug = slug == "sets" ? "sets/hey-joe" : slug;
          const foundCatalog = catalog.find((catalog) => catalog.name == name);

          return (
            <Link
              className="block relative w-full h-[200px] lg:h-[316px] group rounded-[5px] overflow-hidden"
              href={`/catalog/${categorySlug}`}
              key={name}
            >
              <Image
                className="object-cover saturate-0 transition group-hover:saturate-100"
                src={foundCatalog?.bg || BeardBgImage}
                alt={alt}
                fill
              />
              <Action
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[300px] w-full"
                size="big"
                color="white"
              >
                {name}
              </Action>
            </Link>
          );
        })}
      </div>
    </section>
    // {/* </SectionAnimationWrapper> */}
  );
}

export default OurCatalogSection;
