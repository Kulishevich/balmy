import Image from "next/image";
import Link from "next/link";
import Action from "./action";
import RepeatIcon from "@/public/icons/repeat.svg";
import { IOrderItem } from "@/types/orders";

function OrderHistoryElem({ order }: { order: IOrderItem }) {
  return (
    <div className="flex flex-col items-start gap-7 p-6 w-full border border-white rounded-[5px]">
      <div className="flex justify-between w-full">
        <p className="text-[26px]">
          Заказ №<span className="underline">{order.order_number}</span> от{" "}
          {new Date(order.order_date).toLocaleDateString("RU-ru")}
        </p>
        <span className="px-4 py-1 bg-[#E68721] rounded-[5px]">
          {order.status?.name}
        </span>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-[#9E9E9E]">Товары:</p>
        <div className="flex gap-4 w-full overflow-auto">
          {order.items.map((product) => (
            <Link
              href={`/product/${product.id}`}
              className="relative w-[120px] h-[120px] shrink-0"
              key={product.id}
            >
              <Image
                src={
                  !!product.product_images
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${product.product_images}`
                    : "/icons/logo-gray.svg"
                }
                fill
                alt={product.product_name}
                className="object-contain rounded-[5px]"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[#9E9E9E]">Сумма:</p>
        <p className="text-[30px]">{order.total_amount}</p>
      </div>
      <Action color="gold" className="w-full lg:w-[300px]">
        <RepeatIcon />
        Повторить заказ
      </Action>
    </div>
  );
}

export default OrderHistoryElem;
