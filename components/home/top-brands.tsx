"use client";
import HeyJoeImage from "@/public/images/hey-joe.webp";
import ZewImage from "@/public/images/zew.webp";
import HairoticImage from "@/public/images/hairotic.webp";
import CaptainFawcettLimitedImage from "@/public/images/captain-fawcett-limited.webp";
import HeyJoeLogoImage from "@/public/images/hey-joe-logo.webp";
import ZewLogoImage from "@/public/images/zew-logo.webp";
import HairoticLogoImage from "@/public/images/hairotic-logo.webp";
import CaptainFawcettLimitedLogoImage from "@/public/images/captain-fawcett-limited-logo.webp";
import Image from "next/image";
import cn from "clsx";
import { m } from "motion/react";
import Link from "next/link";
import { brandAnimation } from "@/utils/animations";

interface Props {
  className?: string;
}

const brands = [
  {
    name: "Hey Joe",
    image: HeyJoeImage,
    logo: HeyJoeLogoImage,
    href: "/catalog/brands/hey-joe",
  },
  {
    name: "Zew",
    image: ZewImage,
    logo: ZewLogoImage,
    href: "/catalog/brands/zew",
  },
  {
    name: "Hairotic",
    image: HairoticImage,
    logo: HairoticLogoImage,
    href: "/catalog/brands/hairoticmen",
  },
  {
    name: "Captain fawcett limited",
    image: CaptainFawcettLimitedImage,
    logo: CaptainFawcettLimitedLogoImage,
    href: "/catalog/brands/captain-fawcett",
  },
];

function TopBrands({ className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row justify-center gap-y-3 gap-x-[20px]",
        className
      )}
    >
      {brands.map((brand, idx) => {
        const { name, image, logo, href } = brand;
        const alt = name.toLowerCase();

        return (
          <m.div
            key={name}
            className="relative lg:max-w-[220px] w-full h-[190px] border-white border-4 rounded-[5px] overflow-hidden transition hover:shadow-xl group"
            {...brandAnimation(idx)}
          >
            <Link href={href}>
              <Image
                className="object-cover contrast-[1.1] saturate-[.5] transition-all group-hover:scale-125"
                src={image}
                alt={alt}
                placeholder="blur"
                fill
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <Image
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-90"
                src={logo}
                alt="лого"
                width={100}
                height={100}
              />
            </Link>
          </m.div>
        );
      })}
    </div>
  );
}

export default TopBrands;
