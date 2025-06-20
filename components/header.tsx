import { WORK_DAYS, WORK_TIME } from "@/utils/constants";
import PhoneOutlineIcon from "@/public/icons/phone-outline.svg";
import CartInfo from "@/components/cart-info";
import Link from "next/link";
import Search from "./search/search";
import Image from "next/image";

function Header({ phones }: { phones: string[] | [] }) {
  return (
    <header
      className="w-full bg-dark-grey sticky top-0 z-20
    "
    >
      <div className="container py-7 hidden lg:flex items-center">
        <div className="w-[116px] h-[98px] relative">
          <Image
            src={"/images/logo.png"}
            fill
            alt="logo"
            className="object-cover"
          />
        </div>
        <Search className="ml-[37px]" />
        <CartInfo className="ml-4" />
        <div className="ml-auto pl-2 flex flex-col flex-shrink-0">
          {phones.map((phone, index) => (
            <Link
              key={index}
              className="font-semibold text-[21px]"
              href={`tel:${phone}`}
            >
              <span className="hidden 2xl:inline-flex">{phone}</span>
              <PhoneOutlineIcon className="2xl:hidden" />
            </Link>
          ))}
          <time className="text-[15px] font-normal text-white/50 hidden 2xl:inline-block">
            {WORK_DAYS} {WORK_TIME}
          </time>
        </div>
      </div>
    </header>
  );
}

export default Header;
