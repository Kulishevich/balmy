"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PUBLIC_ROUTES = ["/authorization"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("token");
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    if (!token && !isPublic) {
      router.replace("/authorization");
    } else if (token && isPublic) {
      router.replace("/");
    } else {
      setIsReady(true);
    }
  }, [pathname]);

  // Показываем children только если разрешено
  if (!isReady && !PUBLIC_ROUTES.includes(pathname)) {
    return null; // можно добавить спиннер или прелоадер
  }

  return <>{children}</>;
}
