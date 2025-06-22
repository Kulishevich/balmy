"use client";
import Link from "next/link";
import PhoneIcon from "@/public/icons/phone.svg";
import MapPinIcon from "@/public/icons/map-pin.svg";
import MailIcon from "@/public/icons/mail.svg";
import { ADDRESS, MAIL } from "@/utils/constants";
import Action from "./action";
import { useScreenSize } from "@/hooks/use-screen-size";
import { Category } from "@/types/category";
import { usePopupStore } from "@/store/popup";
import Payments from "./payments";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Contacts } from "@/types/contacts";

interface Props {
  categories: Category[];
  contacts: Contacts;
  logo: string | null;
}

const information = [
  { name: "Скидки", link: "/catalog/discounts" },
  { name: "Контакты", link: "/contacts" },
  { name: "Договор оферты", link: "/offer-contract" },
  { name: "Политика конфиденциальности", link: "/privacy-policy" },
];

function Footer({ categories, contacts, logo }: Props) {
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
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo}`}
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
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo}`}
                  fill
                  alt="logo"
                  className="object-cover"
                />
              </Link>
            )}
            <div className="mt-8 lg:mt-3 flex items-center lg:items-start lg:flex-col">
              {!isTablet && (
                <p className="hidden lg:block mt-4 max-w-[280px] 2xl:max-w-[310px] text-base opacity-70 whitespace-pre-line">
                  {contacts.company_info}
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
                  .filter((category) => category.name !== "Бренды")
                  .map((category) => {
                    const { name, slug } = category;

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
                {contacts.working_hours}
              </p>
              {contacts.phones.map((phone, index) => (
                <Link
                  className="mt-4 text-[20px] inline-flex gap-3 items-center"
                  href={`tel:${phone}`}
                  key={index}
                >
                  <PhoneIcon className="flex-shrink-0 fill-white" />
                  {phone}
                </Link>
              ))}
              <Link
                className="mt-4 text-[20px] inline-flex gap-3 items-center"
                href={contacts.address || ADDRESS}
                target="_blank"
              >
                <MapPinIcon className="flex-shrink-0 fill-white" />
                {contacts.address}
              </Link>
              <Link
                className="mt-4 text-[20px] inline-flex gap-3 items-center"
                href={contacts.email || MAIL.href}
              >
                <MailIcon className="flex-shrink-0 fill-white" />
                {contacts.email || MAIL.value}
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
            <p className="mt-9 max-w-[310px] text-base opacity-70 text-center mx-auto whitespace-pre-line">
              {contacts.company_info}
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
