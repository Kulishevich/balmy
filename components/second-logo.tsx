"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SecondLogo({
  logo,
  width = "116",
  height = "98",
}: {
  logo: string;
  width?: string;
  height?: string;
}) {
  const pathname = usePathname();

  return pathname === "/" ? (
    <div className={`w-[${width}px] h-[${height}px] relative`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo}`}
        fill
        alt="logo"
        className="object-cover"
      />
    </div>
  ) : (
    <Link href="/" className="w-[116px] h-[98px] relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo}`}
        fill
        alt="logo"
        className="object-cover"
      />
    </Link>
  );
}

export default SecondLogo;
