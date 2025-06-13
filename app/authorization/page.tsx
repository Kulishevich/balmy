import { AuthorizationWindow } from "@/components/authorization/AuthorizationWindow";
// import LogoHeader from "@/components/logo-header";

function AuthorizationPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/auth-bg.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео фон.
      </video>

      <div className="absolute inset-0 bg-[#171717B2] z-0" />
      <div className="flex flex-col gap-6">
        {/* <LogoHeader /> */}
        <AuthorizationWindow />
      </div>
    </div>
  );
}

export default AuthorizationPage;
