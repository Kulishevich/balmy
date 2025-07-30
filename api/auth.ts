import {
  IBonuses,
  IChangePasswordData,
  ICreateClientRequest,
  ILoginRequest,
  ILoginResponse,
  IMe,
  IPasswordRecovery,
  IPasswordRecoveryResponse,
  ISetEmailAndResetPasswordData,
  ISetEmailAndResetPasswordResponse,
} from "@/types/auth";

export async function CreateClientRequest(orderData: ICreateClientRequest) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client-requests`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка API: ${res.status} — ${message}`);
    }

    const order = await res.text();
    return order;
  } catch (err) {
    console.error("Ошибка при отправке данных нового клиента:", err);
    throw err;
  }
}

export async function LoginRequest(
  orderData: ILoginRequest
): Promise<ILoginResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/login`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка API: ${res.status} — ${message}`);
    }

    const order = await res.json();

    return order;
  } catch (err) {
    console.error("Ошибка при входе в аккаунт:", err);
    throw err;
  }
}

export async function LogoutRequest(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/logout`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const order = await res.text();
    return order;
  } catch (err) {
    console.error("Ошибка при выходе из аккаунта:", err);
    return null;
  }
}

export async function getMe(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/profile`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const { data } = (await res.json()) as { data: IMe };

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
}

export async function forgotPassword(
  passwordRecoveryData: IPasswordRecovery
): Promise<IPasswordRecoveryResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/forgot-password`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordRecoveryData),
    });

    const order = await res.json();

    return order;
  } catch (err) {
    console.error("Ошибка при входе в аккаунт:", err);
    throw err;
  }
}

export async function setEmailAndResetPassword(
  setEmailAndResetPasswordData: ISetEmailAndResetPasswordData
): Promise<ISetEmailAndResetPasswordResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/clients/set-email-and-reset-password`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setEmailAndResetPasswordData),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка API: ${res.status} — ${message}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Ошибка при входе в аккаунт:", err);
    throw err;
  }
}

export async function changePassword({
  new_password,
  token,
}: IChangePasswordData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/change-password`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_password }),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка при смене пароля — ${message}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Ошибка при смене пароля:", err);
    throw err;
  }
}

export async function getAllBonuses(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/bonus-points`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const { data } = (await res.json()) as { data: IBonuses };

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
}
