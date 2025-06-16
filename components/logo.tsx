import React from "react";
import LogoSvg from "@/public/icons/logo-light.svg";

function Logo() {
  return (
    <div className="w-[216px] flex flex-col items-center text-center">
      <LogoSvg />
      <p className="text-[15px] font-semibold">Официальный дистрибьютор</p>
    </div>
  );
}

export default Logo;
