"use client";
import Link from "next/link";
import PhoneIcon from "@/public/icons/phone.svg";
import MapPinIcon from "@/public/icons/map-pin.svg";
import MailIcon from "@/public/icons/mail.svg";
import {
  ADDRESS,
  MAIL,
  PHONE_NUMBER,
  WORK_DAYS,
  WORK_TIME,
} from "@/utils/constants";
import Action from "./action";
import { useScreenSize } from "@/hooks/use-screen-size";
import { Category } from "@/types/category";
import { usePopupStore } from "@/store/popup";
import Payments from "./payments";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
  categories: Category[];
}

const information = [
  { name: "Скидки", link: "/catalog/discounts" },
  { name: "Контакты", link: "/contacts" },
  { name: "Договор оферты", link: "/offer-contract" },
  { name: "Политика конфиденциальности", link: "/privacy-policy" },
];

function Footer({ categories }: Props) {
  const pathname = usePathname();
  const { isTablet } = useScreenSize();
  const { createPopup } = usePopupStore();
  const currentYear = new Date().getFullYear();

  function handleClickOnCallbackButton() {
    createPopup({ type: "callback" });
  }

  return (
    <footer className="mt-auto pt-[72px] sm:pt-[120px]">
      <div className="bg-dark-gray text-white">
        <div className="container py-12 flex flex-col lg:flex-row sm:bg-[url('/images/footer-bg.webp')] bg-no-repeat bg-center">
          <div className="w-max mx-auto flex flex-col lg:mx-0">
            {pathname === "/" ? (
              <div className="w-[145px] h-[122px] relative">
                <Image
                  src={"/images/logo.png"}
                  fill
                  alt="logo"
                  className="object-cover"
                />
              </div>
            ) : (
              <Link
                className="mx-auto lg:mx-0 w-[145px] h-[122px] relative"
                href="/"
              >
                <Image
                  src={"/images/logo.png"}
                  fill
                  alt="logo"
                  className="object-cover"
                />
              </Link>
            )}
            <div className="mt-8 lg:mt-3 flex items-center lg:items-start lg:flex-col">
              {!isTablet && (
                <p className="hidden lg:block mt-4 max-w-[280px] 2xl:max-w-[310px] text-base opacity-70">
                  OOO &quot; Коммерс Коннект &quot; <br /> УНП 193716324 <br />{" "}
                  220004, РБ, г. Минск, переулок Тучинский 4, пом.13 <br /> В
                  торговом реестре с 04 Января 2024 г., № регистрации 570934
                </p>
              )}
              {isTablet && (
                <Action
                  type="button"
                  className="ml-2 max-w-[234px]"
                  color="white"
                  variant="outline"
                  size="small"
                  onClick={handleClickOnCallbackButton}
                >
                  Заказать звонок
                </Action>
              )}
            </div>
          </div>
          <div className="ml-0 lg:ml-9 xl:ml-auto flex flex-wrap mt-9 lg:mt-0 lg:flex-nowrap gap-y-9 gap-x-[25px] lg:gap-16 justify-center">
            <div className="max-w-[131px]">
              <p className="text-[21px] font-semibold">Каталог</p>
              <ul className="mt-4 flex flex-col gap-y-[14px]">
                {categories
                  .filter((category) => category.id !== "Бренды")
                  .map((category) => {
                    const { id: name, slug } = category;

                    return (
                      <li key={slug}>
                        <Link href={`/catalog/${slug}`}>{name}</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="max-w-[180px]">
              <p className="text-[21px] font-semibold">Информация</p>
              <menu
                className="mt-4 flex flex-col gap-y-[14px]"
                itemScope
                itemType="http://schema.org/SiteNavigationElement"
              >
                {information.map((item, idx) => {
                  const { name, link } = item;

                  return (
                    <li key={idx}>
                      <Link href={link} itemProp="url">
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </menu>
            </div>
            <div className="flex flex-col max-w-[300px] mx-auto lg:mx-0">
              <p className="text-[21px] font-semibold text-center sm:text-left">
                Контакты
              </p>
              <p className="mt-4 text-[20px] inline-flex gap-3 items-center">
                {WORK_DAYS} {WORK_TIME}
              </p>
              <Link
                className="mt-4 text-[20px] inline-flex gap-3 items-center"
                href={PHONE_NUMBER.href}
              >
                <PhoneIcon className="flex-shrink-0 fill-white" />
                {PHONE_NUMBER.value}
              </Link>
              <Link
                className="mt-4 text-[20px] inline-flex gap-3 items-center"
                href={ADDRESS.href}
                target="_blank"
              >
                <MapPinIcon className="flex-shrink-0 fill-white" />
                {ADDRESS.value}
              </Link>
              <Link
                className="mt-4 text-[20px] inline-flex gap-3 items-center"
                href={MAIL.href}
              >
                <MailIcon className="flex-shrink-0 fill-white" />
                {MAIL.value}
              </Link>
              {!isTablet && (
                <Action
                  type="button"
                  className="mt-6 max-w-[234px]"
                  color="white"
                  variant="outline"
                  onClick={handleClickOnCallbackButton}
                >
                  Заказать звонок
                </Action>
              )}
            </div>
          </div>
          {isTablet && (
            <p className="mt-9 max-w-[310px] text-base opacity-70 text-center mx-auto">
              OOO &quot; Коммерс Коннект &quot; <br /> УНП 193716324 <br />{" "}
              220004, РБ, г. Минск, переулок Тучинский 4, пом.13 <br /> В
              торговом реестре с 04 Января 2024 г., № регистрации 570934
            </p>
          )}
        </div>
        <div className="flex flex-col container pb-12">
          <div className="flex flex-col gap-y-2 lg:gap-0 lg:flex-row justify-between items-center">
            <Link href="/" className="text-sm font-normal">
              © {currentYear} balmy.by
            </Link>
            <Link
              className="text-sm font-normal"
              href="https://www.web-space.by"
              target="_blank"
            >
              web-space.by - разработка сайтов
            </Link>
          </div>
          <Payments />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
