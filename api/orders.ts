import {
  IOrders,
  IOrderStatus,
  MaxBonusPointsData,
  MaxBonusPointsResponse,
} from "@/types/orders";

export async function getOrders(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/orders`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("hui");
      return null;
    }

    const { data } = (await res.json()) as { data: IOrders };
    return data;
  } catch (error) {
    console.error("Ошибка при получении заказов пользователя:", error);
    return null;
  }
}

export async function getStatuses() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/order-statuses`;

  try {
    const res = await fetch(url, {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("hui");
      return null;
    }

    const data = (await res.json()) as IOrderStatus[];
    return data;
  } catch (error) {
    console.error("Ошибка при получении заказов пользователя:", error);
    return null;
  }
}

export const getMaxBonusPoints = async ({
  token,
  order_amount,
}: MaxBonusPointsData): Promise<MaxBonusPointsResponse | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/bonus-points/calculate-max`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_amount }),
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
};
