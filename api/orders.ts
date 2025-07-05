import { IOrders, IOrderStatus } from "@/types/orders";

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
      next: { revalidate: 60 },
      method: "GET",
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
