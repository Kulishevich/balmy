"use client";
import Link from "next/link";
import CartInfo from "../cart-info";
import PhoneIcon from "@/public/icons/phone.svg";
import MapPinIcon from "@/public/icons/map-pin.svg";
import MailIcon from "@/public/icons/mail.svg";
import SocialNetwokrs from "../social-networks";
import Action from "../action";
import { AnimatePresence, m } from "motion/react";
import { createPortal } from "react-dom";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { useSwipeable } from "react-swipeable";
import {
  popupBackgroundAnimation,
  rightAppearanceAnimation,
} from "@/utils/animations";
import { useScreenSize } from "@/hooks/use-screen-size";
import { Category } from "@/types/category";
import MobileMenuCatalog from "./catalog";
import { Contacts } from "@/types/contacts";
import { ADDRESS } from "@/utils/constants";

interface Props {
  categories: Category[];
  contacts: Contacts;
}

const links = [
  { name: "Скидки", href: "/catalog/discounts" },
  { name: "Контакты", href: "/contacts" },
];

function MobileMenu({ categories, contacts }: Props) {
  const { isTablet } = useScreenSize();
  const { isOpen, closeMobileMenu } = useMobileMenuStore();
  const swipeHandlers = useSwipeable({
    onSwipedLeft: closeMobileMenu,
    trackTouch: true,
  });

  if (!isTablet) {
    return <></>;
  }

  console.log(contacts);

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div {...swipeHandlers}>
              <m.div
                className="bg-dark-gray text-white fixed flex flex-col items-start inset-0 w-[90%] z-20 bg-[url('/images/logo-text.webp')] bg-no-repeat bg-left py-[26px] pb-9 px-7 overflow-y-scroll"
                {...rightAppearanceAnimation}
              >
                <ul className="flex flex-col w-full">
                  <MobileMenuCatalog categories={categories} />
                  {links.map((link) => {
                    const { name, href } = link;
                    return (
                      <li className="inline-flex py-[10px] w-full" key={href}>
                        <Link
                          className="text-[21px] font-semibold inline-block w-full"
                          href={href}
                          onClick={closeMobileMenu}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="inline-flex w-full py-[10px]">
                    <CartInfo mobileMenu />
                  </li>
                </ul>
                <div className="mt-auto pt-[32px] flex flex-col">
                  {contacts.phones.map((phone, index) => (
                    <Link
                      key={index}
                      className="mt-4 text-[17px] inline-flex gap-3 items-center"
                      href={`tel:${phone}`}
                    >
                      <PhoneIcon className="flex-shrink-0 fill-white" />
                      {phone}
                    </Link>
                  ))}
                  <time className="text-[14px] font-light ml-10 mt-1 text-light-gray 2xl:inline-block">
                    {contacts.working_hours}
                  </time>
                  <Link
                    className="mt-4 text-[17px] inline-flex gap-3 items-center"
                    href={ADDRESS.href}
                    target="_blank"
                  >
                    <MapPinIcon className="flex-shrink-0 fill-white" />
                    {ADDRESS.value}
                  </Link>
                  <Link
                    className="mt-4 text-[17px] inline-flex gap-3 items-center"
                    href={`mailto:${contacts.email}`}
                  >
                    <MailIcon className="flex-shrink-0 fill-white" />
                    {contacts.email}
                  </Link>
                  <Action
                    className="mt-6 max-w-[234px]"
                    color="white"
                    variant="outline"
                  >
                    Заказать звонок
                  </Action>
                  <SocialNetwokrs
                    className="-ml-12 lg:ml-0 mt-6 scale-75 lg:scale-100"
                    socialLinks={contacts.social_links}
                  />
                </div>
              </m.div>
              <m.div
                className="fixed inset-0 bg-dark-gray/70 z-10"
                onClick={closeMobileMenu}
                {...popupBackgroundAnimation}
              ></m.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default MobileMenu;
