"use client";
import Logo from "@/public/icons/logo-dark.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SecondLogo() {
  const pathname = usePathname();

  return pathname === "/" ? (
    <div>
      <Logo className="fill-white z-10" />
      <p className="text-white z-10">Официальный дистрибьютор</p>
    </div>
  ) : (
    <Link href="/">
      <Logo className="fill-white z-10" />
      <p className="text-white z-10">Официальный дистрибьютор</p>
    </Link>
  );
}

export default SecondLogo;
