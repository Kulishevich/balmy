import cn from "clsx";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  type?: "main" | "h1" | "h2" | "h3";
}

function Title({ children, className, type = "h2", ...props }: Props) {
  switch (type) {
    case "main":
      return (
        <h1
          className={cn(
            "text-[30px] lg:text-[64px] font-bold leading-[1.2]",
            className,
          )}
          {...props}
        >
          {children}
        </h1>
      );
    case "h1":
      return (
        <h1 className={cn("text-[36px] sm:text-[52px] font-extrabold sm:font-bold", className)} {...props}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "text-[28px] lg:text-[52px] font-extrabold sm:font-bold",
            className,
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "text-[28px] font-extrabold sm:text-[41px] sm:font-semibold",
            className,
          )}
          {...props}
        >
          {children}
        </h3>
      );
    default:
      return null;
  }
}

export default Title;
