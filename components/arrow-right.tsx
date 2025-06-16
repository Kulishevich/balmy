import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import cn from "clsx";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "transparent" | "fill";
  size?: "small" | "big";
}

function ArrowRight({
  className,
  variant = "fill",
  size = "big",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "rounded-full h-16 w-16 grid place-items-center",
        { "bg-dark-gold hover:bg-gold-gradient": variant === "fill" },
        { "bg-transparent": variant == "transparent" },
        { "h-16 w-16": size == "big" },
        { "h-[42px] w-[42px]": size == "small" },
        className
      )}
      {...props}
    >
      <ArrowRightIcon
        className={cn({
          "fill-white": variant == "fill",
          "fill-gold": variant == "transparent",
        })}
      />
    </button>
  );
}

export default ArrowRight;
