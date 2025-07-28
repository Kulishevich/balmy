import React, { Dispatch, SetStateAction } from "react";
import Action from "../action";
import { AuthT } from "./AuthorizationWindow";

type NotPartnerProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
};

export const NotPartner = ({ setAuthState }: NotPartnerProps) => {
  const handleClick = () => {
    setAuthState("sign_up");
  };

  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <p className="text-[24px] lg:text-[42px] font-bold w-full">
        Вы ещё не партнёр Balmy Pro 😢{" "}
      </p>
      <p className="text-[17px] font-normal w-full">
        Вы не являетесь действующим партнёром Balmy Pro, пожалуйста, пройдите
        регистрацию
      </p>
      <Action
        className="w-full text-[19px] lg:text-[21px]"
        onClick={handleClick}
      >
        Пройти регистрацию
      </Action>
    </div>
  );
};
