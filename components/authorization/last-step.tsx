import React, { Dispatch, SetStateAction } from "react";
import { AuthT } from "./AuthorizationWindow";
import Action from "../action";

type LastStepProps = {
  setAuthState: Dispatch<SetStateAction<AuthT>>;
  email: string;
};

export const LastStep = ({ setAuthState, email }: LastStepProps) => {
  const handleClick = () => {
    setAuthState("second_sign_in");
  };

  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <p className="text-[24px] lg:text-[42px] font-bold w-full">
        Остался один шаг 💌
      </p>
      <p className="text-[17px] font-normal w-full">
        Пароль уже выслан на ваш email {email}, пожалуйста, проверьте почтовый
        ящик
      </p>
      <Action
        className="w-full text-[19px] lg:text-[21px]"
        onClick={handleClick}
      >
        Ввести пароль
      </Action>
    </div>
  );
};
