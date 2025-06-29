import PhoneOutlineIcon from "@/public/icons/phone-outline.svg";
import CartInfo from "@/components/cart-info";
import Link from "next/link";
import Search from "./search/search";
import SecondLogo from "./second-logo";
import { Contacts } from "@/types/contacts";

function Header({
  contacts,
  logo,
}: {
  contacts: Contacts;
  logo: string | null;
}) {
  return (
    <header
      className="w-full bg-dark-grey sticky top-0 z-20
    "
    >
      <div className="container py-7 hidden lg:flex items-center">
        <SecondLogo logo={logo || ""} />
        <Search className="ml-[37px]" />
        <CartInfo className="ml-4" />
        <div className="ml-auto pl-2 flex flex-col flex-shrink-0">
          {contacts.phones.map((phone, index) => (
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
            {contacts.working_hours}
          </time>
        </div>
      </div>
    </header>
  );
}

export default Header;
