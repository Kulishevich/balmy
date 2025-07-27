import Action from "../action";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { secondSignInScheme } from "@/utils/schemes/second-sign-in";
import { normalizePhone } from "@/utils/helper";
import { LoginRequest } from "@/api/auth";
import { showToast } from "../toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type SecondSignInFormT = {
  password: string;
};

type SecondSignInFormProps = {
  phone: string;
};

export const SecondSignInForm = ({ phone }: SecondSignInFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecondSignInFormT>({
    resolver: yupResolver(secondSignInScheme),
  });

  const formHandler = handleSubmit(async (data) => {
    const normalPhone = normalizePhone(phone);

    try {
      const res = await LoginRequest({
        password: data.password,
        phone: normalPhone,
      });
      const token = `${res.data.token_type} ${res.data.token}`;

      // todo: change secure - true
      Cookies.set("token", token, { path: "/", secure: false });
      reset();
      showToast({
        title: "Успешный вход!",
        variant: "success",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      showToast({
        title: "Произошла ошибка",
        description: "Пожалуйста, повторите попытку ещё раз.",
        variant: "error",
      });
    }
  });

  return (
    <form onSubmit={formHandler} className="flex flex-col gap-6 items-center">
      <p className="text-[42px] font-bold">Вход на сайт</p>
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-normal cursor-pointer" htmlFor="password">
          Пароль из email*
        </label>
        <input
          className={clsx("custom-input--dark mt-[6px] ", {
            "custom-input--dark-error": errors["password"],
          })}
          id="password"
          type="password"
          placeholder="Пароль из email"
          {...register("password")}
        />
        {errors["password"] && (
          <span className="mt-2 text-[#EB001B] text-[15px] font-normal">
            *{errors["password"].message}
          </span>
        )}
      </div>
      <Action className="w-full" typeButton="submit">
        Войти
      </Action>
    </form>
  );
};
