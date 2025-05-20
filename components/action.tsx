import cn from "clsx";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  size?: "big" | "medium" | "small";
  color?:
    | "dark-gray"
    | "light-green"
    | "light-gray"
    | "gray"
    | "white"
    | "green";
  variant?: "outline";
  type?: "link" | "button";
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  typeButton?: "submit" | "button";
  form?: string;
}

function Action({
  children,
  size = "medium",
  color = "dark-gray",
  type = "button",
  href = "/",
  onClick,
  variant,
  disabled = false,
  className,
  typeButton = "button",
  form,
}: Props) {
  const actionClassName = cn(
    "block p-1 border-2 rounded-[5px] text-center group transition",
    {
      "border-dark-gray": color == "dark-gray",
      "border-light-green": color == "light-green",
      "border-gray": color == "gray",
      "border-white": color == "white",
      "border-green": color == "green",
      "border-light-gray hover:border-light-green": color == "light-gray",
      "border-light-gray": disabled,
    },
    className
  );

  const wrapperClassName = cn("block rounded-[5px] transition", {
    "py-4 text-[20px] px-6": size == "big",
    "py-3 px-6": size == "medium",
    "py-2 px-3": size == "small",
    "bg-dark-gray text-white": color == "dark-gray",
    "bg-light-green text-white": color == "light-green",
    "bg-gray text-white": color == "gray",
    "bg-white text-dark-gray": color == "white",
    "bg-green text-white": color == "green",
    "bg-light-gray text-dark-gray group-hover:bg-light-green group-hover:text-white":
      color == "light-gray",
    "bg-white/0 text-white": variant == "outline",
    "bg-light-gray text-dark-gray": disabled,
  });

  if (type == "button") {
    return (
      <button
        className={actionClassName}
        onClick={onClick}
        disabled={disabled}
        type={typeButton}
        form={form}
      >
        <span className={wrapperClassName}>{children}</span>
      </button>
    );
  }

  if (type == "link") {
    return (
      <Link className={actionClassName} href={href}>
        <span className={wrapperClassName}>{children}</span>
      </Link>
    );
  }

  return null;
}

export default Action;
