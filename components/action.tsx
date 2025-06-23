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
    | "gold"
    | "black"
    | "light-gold"
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
      "border-gold hover:border-gold": color == "gold" && !disabled,
      "border-dark-gray": color == "dark-gray" && !disabled,
      "border-white px-1 py-1": color == "black" && !disabled,
      "border-light-green": color == "light-green" && !disabled,
      "border-gray": color == "gray" && !disabled,
      "border-white hover:border-gold": color == "white" && !disabled,
      "border-green": color == "green" && !disabled,
      "border-light-gray hover:border-light-green":
        color == "light-gray" && !disabled,
      "border-light-gray/30": disabled,
    },
    className
  );

  const wrapperClassName = cn(
    "flex items-center justify-center gap-[6px] rounded-[5px] transition ",
    {
      "bg-gold hover:bg-gold hover:text-black": color == "gold" && !disabled,
      "py-4 text-[20px] px-6": size == "big",
      "py-3 px-6": size == "medium",
      "py-2 px-3": size == "small",
      "bg-dark-gray text-white": color == "dark-gray" && !disabled,
      "bg-black text-white border border-white": color == "black" && !disabled,
      "bg-light-green text-white": color == "light-green" && !disabled,
      "bg-gray text-white": color == "gray" && !disabled,
      "bg-white text-dark-gray hover:bg-gold": color == "white" && !disabled,
      "bg-green text-white": color == "green" && !disabled,
      "bg-light-gray text-dark-gray group-hover:bg-light-green group-hover:text-white":
        color == "light-gray" && !disabled,
      "bg-white/0 text-white": variant == "outline",
      "bg-light-gray/30 text-dark-gray": disabled,
    }
  );

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
