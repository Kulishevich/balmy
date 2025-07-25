import React, { Dispatch, SetStateAction } from "react";
import { AuthT } from "./AuthorizationWindow";
import Action from "../action";

type LastStepProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
};

export const LastStep = ({ setAuthState }: LastStepProps) => {
  const handleClick = () => {
    setAuthState("second_sign_in");
  };

  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <p className="text-[42px] font-bold w-full">Остался один шаг 💌</p>
      <p className="text-[14px] font-normal w-full">
        Пароль уже выслан на ваш email example@gmail.com, пожалуйста, проверьте
        почтовый ящик
      </p>
      <Action className="w-full" onClick={handleClick}>
        Ввести пароль
      </Action>
    </div>
  );
};
