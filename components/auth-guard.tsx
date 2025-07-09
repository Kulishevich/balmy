"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getMe, LogoutRequest } from "@/api/auth";
import { showToast } from "./toast";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = Cookies.get("token") || "";

  const logout = async () => {
    try {
      await LogoutRequest(token);
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    } finally {
      Cookies.remove("token");
      router.push("/authorization");
    }
  };

  useEffect(() => {
    const checkTokenValid = async () => {
      const me = await getMe(token);
      if (!me) {
        showToast({
          title: "Ваш токен устарел, войдите снова.",
          variant: "error",
        });

        logout();
      }
    };

    checkTokenValid();
  }, [token]);

  return <>{children}</>;
}
