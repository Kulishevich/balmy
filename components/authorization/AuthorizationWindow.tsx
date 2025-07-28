"use client";
import React, { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";
import { PasswordRecovery } from "./password-recovery";
import { NotPartner } from "./not-partner";
import { LastStep } from "./last-step";
import { SecondSignInForm } from "./second-sign-in-form";
import { NoEmailForm } from "./no-email-form";

export type AuthT =
  | "sign_up"
  | "log_in"
  | "password_recovery"
  | "not_partner"
  | "last_step"
  | "second_sign_in"
  | "no_email";

export const AuthorizationWindow = () => {
  const [authState, setAuthState] = useState<AuthT>("sign_up");
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const renderContent = () => {
    switch (authState) {
      case "sign_up":
        return <SignUpForm setAuthState={setAuthState} authState={authState} />;
      case "log_in":
        return <SignInForm setAuthState={setAuthState} authState={authState} />;
      case "password_recovery":
        return (
          <PasswordRecovery
            setAuthState={setAuthState}
            setEmail={setEmail}
            setPhone={setPhone}
          />
        );
      case "not_partner":
        return <NotPartner setAuthState={setAuthState} />;
      case "last_step":
        return <LastStep setAuthState={setAuthState} email={email || ""} />;
      case "second_sign_in":
        return <SecondSignInForm phone={phone || ""} />;
      case "no_email":
        return <NoEmailForm setAuthState={setAuthState} phone={phone || ""} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full z-10 bg-white text-black rounded-md p-8 lg:px-[76px] lg:py-[52px] flex flex-col gap-6 max-w-[336px] sm:max-w-[600px] md:max-w-[766px]">
      {renderContent()}
    </div>
  );
};
