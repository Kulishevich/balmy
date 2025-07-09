import { clsx } from "clsx";
import { ToastT, Toaster, toast } from "sonner";

import ErrorIcon from "@/public/icons/error-icon.svg";
import SuccessIcon from "@/public/icons/success-icon.svg";
import Action from "./action";

const DEFAULT_DURATION = 5000;
const DEFAULT_POSITION = "top-center";

type ToastType = "error" | "success";

type ToastOptions = {
  description?: string;
  title: string;
  variant?: ToastType;
} & Omit<ToastT, "id">;

const showToast = ({
  className,
  duration = DEFAULT_DURATION,
  description,
  title,
  position = DEFAULT_POSITION,
  variant = "success",
  ...props
}: ToastOptions) => {
  const typesClass = {
    success: "bg-light-green",
    error: "bg-red",
  }[variant];

  toast.custom(
    (t) => (
      <div
        className={clsx(
          "flex flex-col gap-4 px-[34px] py-6 rounded-[5px] items-center w-[410px]",
          typesClass,
          className
        )}
        tabIndex={0}
      >
        {variant === "error" && <ErrorIcon />}
        {variant === "success" && <SuccessIcon />}
        <div className="flex flex-col gap-[6px] items-center text-center">
          <p className="text-[19px] font-semibold">{title}</p>
          {!!description && (
            <p className="text-[14px] font-normal">{description}</p>
          )}
        </div>
        <Action
          color={variant === "success" ? "dark-gray" : "white"}
          className="w-[210px]"
          onClick={() => toast.dismiss(t)}
        >
          {variant === "success" ? "Ок" : "Назад"}
        </Action>
      </div>
    ),
    {
      duration,
      position,
      ...props,
    }
  );
};

export { Toaster, showToast };
