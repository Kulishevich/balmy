import Image from "next/image";
import Link from "next/link";
import Action from "./action";
import RepeatIcon from "@/public/icons/repeat.svg";
import image from "@/public/images/accessory-bg.webp";

const order = {
  date: "17.06.2025",
  id: 121122,
  products: [
    { id: 123522, image: image, price: 100, slug: "hui" },
    { id: 241213, image: image, price: 100, slug: "hui" },
    { id: 351242, image: image, price: 100, slug: "hui" },
    { id: 322322, image: image, price: 100, slug: "hui" },
  ],
  totalPrice: 1000,
  status: "В пути",
};

function OrderHistoryElem() {
  return (
    <div className="flex flex-col items-start gap-7 p-6 w-full lg:w-[960px] border border-white rounded-[5px]">
      <div className="flex justify-between w-full">
        <p className="text-[26px]">
          Заказ №<span className="underline">{order.id}</span> от {order.date}
        </p>
        <span className="px-4 py-1 bg-[#E68721] rounded-[5px]">
          {order.status}
        </span>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-[#9E9E9E]">Товары:</p>
        <div className="flex gap-4 w-full overflow-auto">
          {order.products.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              className="relative w-[120px] h-[120px] shrink-0"
              key={product.id}
            >
              <Image
                src={product.image}
                fill
                alt={product.slug}
                className="object-cover rounded-[5px]"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[#9E9E9E]">Сумма:</p>
        <p className="text-[30px]">{order.totalPrice} byn</p>
      </div>
      <Action color="gold" className="w-full lg:w-[300px]">
        <RepeatIcon />
        Повторить заказ
      </Action>
    </div>
  );
}

export default OrderHistoryElem;
