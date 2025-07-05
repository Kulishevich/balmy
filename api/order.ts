import { OrderRequest } from "@/types/order";

export async function sendOrder(orderData: OrderRequest) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

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
    console.error("Ошибка при отправке one-click заказа:", err);
    throw err;
  }
}
