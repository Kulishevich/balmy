import {
  ICreateClientRequest,
  ILoginRequest,
  ILoginResponse,
  IMe,
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
