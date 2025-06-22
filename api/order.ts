import { OrderRequest } from "@/types/order";

export async function sendOrder(orderData: OrderRequest) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const order = await data.text();

  return { order };
}
