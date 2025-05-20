"use client";
import Logo from "@/public/icons/logo-dark.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoHeader() {
  const pathname = usePathname();

  return pathname === "/" ? (
    <div>
      <Logo className="fill-black" />
      <p>Официальный дистрибьютор</p>
    </div>
  ) : (
    <Link href="/">
      <Logo className="fill-black" />
      <p>Официальный дистрибьютор</p>
    </Link>
  );
}

export default LogoHeader;
