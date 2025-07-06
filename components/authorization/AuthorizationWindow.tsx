"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";

export const AuthorizationWindow = () => {
  const [state, setState] = useState<"sign_up" | "log_in">("sign_up");

  return (
    <div className="relative w-full z-10 bg-white text-black rounded-md p-8 lg:px-[76px] lg:py-[52px] flex flex-col gap-6 max-w-[336px] sm:max-w-[600px] md:max-w-[766px]">
      <div className="flex lg:gap-5 gap-3 justify-center">
        <button
          className={clsx("lg:text-[42px] text-[24px] ", {
            "opacity-100": state == "sign_up",
            "opacity-20": state == "log_in",
          })}
          onClick={() => setState("sign_up")}
        >
          Регистрация
        </button>
        <button
          className={clsx("lg:text-[42px] text-[24px] ", {
            "opacity-100": state == "log_in",
            "opacity-20": state == "sign_up",
          })}
          onClick={() => setState("log_in")}
        >
          /Вход
        </button>
      </div>
      {state === "sign_up" ? <SignUpForm /> : <SignInForm />}
    </div>
  );
};
