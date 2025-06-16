import { AuthorizationWindow } from "@/components/authorization/AuthorizationWindow";
import Logo from "@/components/logo";

function AuthorizationPage() {
  return (
    <div className="relative w-screen h-screen overflow-auto flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/auth-bg.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео фон.
      </video>

      <div className="absolute inset-0 bg-[#171717B2] z-0" />
      <div className="flex flex-col gap-6 z-10 items-center w-full overflow-y-auto max-h-full pt-[72px] pb-[42px]">
        <Logo />
        <AuthorizationWindow />
      </div>
    </div>
  );
}

export default AuthorizationPage;
