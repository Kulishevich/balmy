import InstagramIcon from "@/public/icons/instagram.svg";
import TelegramIcon from "@/public/icons/telegram.svg";
import Link from "next/link";
import cn from "clsx";
import { ISocailLinks } from "@/types/contacts";

declare global {
  interface Window {
    ym?: (id: number, type: string, name: string) => void;
  }
}

interface Props {
  className?: string;
  socialLinks: ISocailLinks;
}

function SocialNetworks({ className, socialLinks }: Props) {
  const handleClick = (goal: string) => () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(96679665, "reachGoal", goal);
    }
  };

  return (
    <div className={cn("flex gap-x-[14px]", className)}>
      <Link
        href={`https://www.instagram.com/${
          socialLinks.instagram || "balmy.hb"
        }/`}
        target="_blank"
        onClick={handleClick("perekhod-v-soc-seti")}
      >
        <InstagramIcon />
      </Link>
      <Link
        href={`https://t.me/${socialLinks.telegram || "+375296395691"}`}
        target="_blank"
        onClick={handleClick("perekhod-v-messendzher")}
      >
        <TelegramIcon />
      </Link>
    </div>
  );
}

export default SocialNetworks;
