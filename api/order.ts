import { OrderRequest, OrderResponse } from "@/types/order";

export async function sendOrder({
  token,
  orderData,
}: {
  token: string;
  orderData: OrderRequest;
}): Promise<OrderResponse | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
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
    console.error("Ошибка при отправке one-click заказа:", err);
    throw err;
  }
}
