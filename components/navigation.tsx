"use client";
import LocationIcon from "@/public/icons/location.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import PhoneOutlineIcon from "@/public/icons/phone-outline.svg";
import SearchMobileIcon from "@/public/icons/search-mobile.svg";
import Link from "next/link";
import Action from "@/components/action";
import { ADDRESS, PHONE_NUMBER } from "@/utils/constants";
import { usePopupStore } from "@/store/popup";
import { useScreenSize } from "@/hooks/use-screen-size";
import CartInfo from "./cart-info";
import { AnimatePresence, m } from "motion/react";
import { appearanceAnimation } from "@/utils/animations";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { useSearchStore } from "@/store/search";
import cn from "clsx";
import Image from "next/image";

const navigation = [
  { name: "Главная", link: "/" },
  { name: "Скидки", link: "/catalog/discounts" },
  { name: "Контакты", link: "/contacts" },
];

function Navigation() {
  const { createPopup } = usePopupStore();
  const { openMobileMenu } = useMobileMenuStore();
  const { closeSearch, openSearch, show } = useSearchStore();
  const { isTablet } = useScreenSize();

  function handleClickOnCallbackButton() {
    createPopup({ type: "callback" });
  }

  function toggleSearch() {
    return show ? closeSearch() : openSearch();
  }

  if (isTablet) {
    return (
      <AnimatePresence>
        <m.div
          className="container h-[70px] flex items-center py-[18px]"
          {...appearanceAnimation}
        >
          <button onClick={openMobileMenu}>
            <BurgerIcon />
            <span className="sr-only">Открыть меню</span>
          </button>
          <Link className="ml-9 w-[67px] h-[57px] relative" href="/">
            <Image
              src={"/images/logo.png"}
              fill
              alt="logo"
              className="object-cover"
            />
          </Link>
          <div className="ml-auto flex gap-6">
            <Link href={PHONE_NUMBER.href}>
              <PhoneOutlineIcon />
            </Link>
            <button onClick={toggleSearch}>
              <SearchMobileIcon
                className={cn("stroke-2 transition", {
                  "stroke-gold": show,
                  "stroke-white": !show,
                })}
              />
              <span className="sr-only">Открыть поиск</span>
            </button>
            <CartInfo />
          </div>
        </m.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="sm:bg-dark-grey  lg:py-2 h-[70px] lg:h-auto opacity-0 lg:opacity-100 border-b border-gray">
      <div className="container flex items-center justify-between">
        <Link
          href={ADDRESS.href}
          className="flex items-center gap-2"
          target="_blank"
        >
          <LocationIcon />
          <span className="font-semibold">Беларусь</span>
        </Link>
        {!isTablet && (
          <nav itemScope itemType="http://schema.org/SiteNavigationElement">
            <menu
              itemProp="about"
              itemScope
              itemType="http://schema.org/ItemList"
              className="flex gap-[42px]"
            >
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ItemList"
                >
                  <Link href={item.link} itemProp="url">
                    {item.name}
                  </Link>
                  <meta itemProp="name" content={item.name} />
                </li>
              ))}
            </menu>
          </nav>
        )}
        <Action color="white" onClick={handleClickOnCallbackButton}>
          Обратный звонок
        </Action>
      </div>
    </div>
  );
}

export default Navigation;
