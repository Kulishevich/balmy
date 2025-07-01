// import Image from "next/image";
// import Link from "next/link";
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
          {order.status}
        </span>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-[#9E9E9E]">Товары:</p>
        <div className="flex gap-4 w-full overflow-auto">
          {order.items.map((_, index) => (
            <span key={index}>пока не приходят</span>
            // <Link
            //   href={`/product/${product.slug}`}
            //   className="relative w-[120px] h-[120px] shrink-0"
            //   key={product.id}
            // >
            //   <Image
            //     src={product.image}
            //     fill
            //     alt={product.slug}
            //     className="object-cover rounded-[5px]"
            //   />
            // </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[#9E9E9E]">Сумма:</p>
        <p className="text-[30px]">
          {order.total_amount} byn скидка - {order.total_discount} удалить
        </p>
      </div>
      <Action color="gold" className="w-full lg:w-[300px]">
        <RepeatIcon />
        Повторить заказ
      </Action>
    </div>
  );
}

export default OrderHistoryElem;
