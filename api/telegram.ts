import { BuyOneClickInputs } from "@/components/buy-one-click-popup";
import { CallbackInputs } from "@/components/callback-popup";
import { Product } from "@/types/product";
import { config } from "@/utils/config";

const baseUrl = `https://api.telegram.org/bot${config.tgBotToken}/sendMessage?chat_id=${config.tgBotChatId}`;

export async function sendMessageToTelegram(message: string) {
  const url = `${baseUrl}&text=${encodeURIComponent(message)}&parse_mode=HTML`;
  const response = await fetch(url);

  if (!response.ok) return Promise.reject();
}

export function createCallbackMessage({ phone, comment }: CallbackInputs) {
  return `<b>Поступила заявка на обратную связь</b>\n\nТелефон: ${phone}\nКомментарий: ${comment}`;
}

export function createBuyOneClickMessage({
  buyOneClickData,
  product,
}: {
  buyOneClickData: BuyOneClickInputs;
  product: Product;
}) {
  const { name, phone, comment } = buyOneClickData;
  const { name: productName, article } = product;

  return `<b>Поступила заявка на покупку в один клик</b>\n\nИмя: ${name}\nТелефон: ${phone}${
    comment ? `\nКомментарий: ${comment}` : ""
  }
  \nНазвание продукта: ${productName}\nАртикул: ${article}`;
}

export function createNewOrderMessage({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) {
  return `<b>Оформлен новый заказ:</b>\n\nТелефон: ${phone}\nФИО: ${name}`;
}
