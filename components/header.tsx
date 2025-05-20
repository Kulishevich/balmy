import { PHONE_NUMBER, WORK_DAYS, WORK_TIME } from "@/utils/constants";
import PhoneOutlineIcon from "@/public/icons/phone-outline.svg";
import CartInfo from "@/components/cart-info";
import Link from "next/link";
import Search from "./search/search";
import LogoHeader from "./logo-header";

function Header() {
  return (
    <header
      className="w-full bg-white sticky top-0 z-50
    "
    >
      <div className="container py-7 hidden lg:flex items-center">
        <LogoHeader />
        <Search className="ml-[37px]" />
        <CartInfo className="ml-4" />
        <div className="ml-auto pl-2 flex flex-col flex-shrink-0">
          <Link className="font-semibold text-[21px]" href={PHONE_NUMBER.href}>
            <span className="hidden 2xl:inline-flex">{PHONE_NUMBER.value}</span>
            <PhoneOutlineIcon className="2xl:hidden" />
          </Link>
          <time className="text-[15px] font-normal text-dark-gray/50 hidden 2xl:inline-block">
            {WORK_DAYS} {WORK_TIME}
          </time>
        </div>
      </div>
    </header>
  );
}

export default Header;
