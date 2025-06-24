"use client";
import React from "react";
import Lottie from "lottie-react";

import animationData from "@/public/animation/phone-animation.json";
import { usePopupStore } from "@/store/popup";

const PhoneAnimationClient = () => {
  const { createPopup } = usePopupStore();

  function handleClickOpenFeedbackForm() {
    createPopup({ type: "callback" });
  }

  return (
    <button
      className="z-[999] fixed right-[72px] bottom-[72px] flex justify-center items-center w-[100px] h-[100px] rounded-full cursor-pointer"
      onClick={handleClickOpenFeedbackForm}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-[356px] h-[178px] pointer-events-none"
      />
    </button>
  );
};

export default PhoneAnimationClient;
