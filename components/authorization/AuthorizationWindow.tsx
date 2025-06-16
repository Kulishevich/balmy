"use client";
import React, { useState } from "react";
import Action from "../action";
import clsx from "clsx";

export const AuthorizationWindow = () => {
  const [state, setState] = useState<"sign_up" | "log_in">("sign_up");

  return (
    <div className="relative z-10 bg-white text-black rounded-md p-8 lg:px-[76px] lg:py-[52px] flex flex-col gap-6 w-[336px] lg:w-[766px]">
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
      {state === "sign_up" ? (
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-[6px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              ФИО
            </label>
            <input
              className={"custom-input mt-[6px] "}
              id="name"
              placeholder="Введите ваше имя"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              Email*
            </label>
            <input
              className={"custom-input mt-[6px]"}
              id="name"
              placeholder="Введите ваше имя"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              Пароль*
            </label>
            <input
              className={"custom-input mt-[6px]"}
              id="name"
              placeholder="Введите ваше имя"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="custom-checkbox border border-[#1717174D]/20"
              id="date"
              type="checkbox"
            />
            <label
              className="font-normal lg:text-[17px] text-[14px]  cursor-pointer"
              htmlFor="date"
            >
              Согласие на обработку персональных данных
            </label>
          </div>
          <Action
            type="link"
            href="/cart/delivery-payment"
            className="mt-2"
            size="big"
          >
            Зарегистрироваться
          </Action>
        </form>
      ) : (
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-[6px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              Email*
            </label>
            <input
              className={"custom-input mt-[6px]"}
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="font-normal cursor-pointer" htmlFor="date">
              Пароль*
            </label>
            <input
              className={"custom-input mt-[6px]"}
              id="password"
              placeholder="Пароль"
            />
          </div>
          <Action
            type="link"
            href="/cart/delivery-payment"
            className="mt-2"
            size="big"
          >
            Зарегистрироваться
          </Action>
        </form>
      )}
    </div>
  );
};
