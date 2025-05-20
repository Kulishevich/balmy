"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "clsx";
import LongArrowRightIcon from "@/public/icons/long-arrow-right.svg";

interface DynamicPath {
  href: string;
  name: string;
}

interface Props {
  className?: string;
  dynamicPath?: DynamicPath | DynamicPath[];
}

function Breadcrumbs({ className, dynamicPath }: Props) {
  const pathname = usePathname();
  const pathNames = pathname.split("/");

  function handlePathName(path: string) {
    switch (path) {
      case "":
        return { href: "/", name: "Главная" };
      case "cart":
        return { href: "/cart", name: "Корзина" };
      case "delivery-payment":
        return { href: "/delivery-payment", name: "Доставка и оплата" };
      case "offer-contract":
        return { href: "/offer-contract", name: "Договор оферты" };
      case "privacy-policy":
        return { href: "/privacy-policy", name: "Политика конфиденциальности" };
      case "contacts":
        return { href: "/contacts", name: "Контакты" };
      case "news":
        return { href: "/news", name: "Новости" };
      default:
        break;
    }
  }

  return (
    <nav aria-label="Хлебные крошки">
      <div className="container flex items-center justify-center">
        <ul
          className={cn(
            "inline-flex flex-wrap max-w-[768px] px-4 justify-center",
            className
          )}
          itemScope
          itemType="http://schema.org/BreadcrumbList"
        >
          {pathNames.map((pathName, idx) => {
            const path = handlePathName(pathName);
            const isCurrentPage = pathname.split("/").pop() === pathName;
            const isNotEmpty = !!path && Boolean(idx);

            return (
              <li
                className="inline-flex items-center"
                key={idx}
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                {isNotEmpty && <LongArrowRightIcon className="mx-[6px]" />}
                <Link
                  href={path?.href || "/"}
                  className={cn({
                    "transition hover:text-green": !isCurrentPage,
                  })}
                  itemProp="item"
                >
                  <span itemProp="name">{path?.name}</span>
                </Link>
                <meta itemProp="position" content={idx.toString()} />
              </li>
            );
          })}

          {dynamicPath &&
            Array.isArray(dynamicPath) &&
            dynamicPath.map((item, idx) => {
              const position = pathNames.length + idx;
              return (
                <li
                  key={idx}
                  className="inline-flex items-center text-center sm:text-left"
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                >
                  <LongArrowRightIcon className="mx-[6px] flex-shrink-0" />
                  {dynamicPath.length - 1 === idx ||
                  item.href === "/catalog/sets" ? (
                    <span itemProp="name">{item.name}</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition hover:text-green"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                  )}
                  <meta itemProp="position" content={position.toString()} />
                </li>
              );
            })}

          {dynamicPath && !Array.isArray(dynamicPath) && (
            <li
              className="inline-flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <LongArrowRightIcon className="mx-[6px]" />
              <span itemProp="name">{dynamicPath.name}</span>
              <meta itemProp="position" content={pathNames.length.toString()} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
