import ArrowLeftIcon from "@/public/icons/arrow-left.svg";
import cn from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "transparent" | "fill";
  size?: "small" | "big";
}

function ArrowLeft({
  className,
  variant = "fill",
  size = "big",
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full h-16 w-16 grid place-items-center",
        {
          "bg-dark-gold hover:bg-light-gold ": variant === "fill",
          "bg-transparent": variant == "transparent",
          "h-16 w-16": size == "big",
          "h-[42px] w-[42px]": size == "small",
        },
        className
      )}
      {...props}
    >
      <ArrowLeftIcon
        className={cn({
          "fill-white": variant == "fill",
          "fill-gold": variant == "transparent",
        })}
      />
    </button>
  );
}

export default ArrowLeft;
