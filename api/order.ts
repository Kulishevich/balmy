import { Order } from "@/types/order";
import { config } from "@/utils/config";

export async function sendOrder(orderData: Order) {
  const url = `${config.apiUrl}/order/cart`;
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
