import Breadcrumbs from "@/components/breadcrumbs";
import OrderHistoryElem from "@/components/order-history-elem";
import Title from "@/components/title";
import OrderFilterMobile from "@/components/order-history/order-filter-mobile";
import { cookies } from "next/headers";
import { getOrders } from "@/api/orders";
import { getMe, LogoutRequest } from "@/api/auth";
import { redirect } from "next/navigation";
import OrderFilterDesktop from "@/components/order-history/order-filter-desktop";

async function PrivacyPolicyPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  const orders = await getOrders(token);
  const me = await getMe(token);
  console.log(orders);
  if (!me) {
    await LogoutRequest(token);

    cookiesStore.delete("token");

    redirect("/authorization");
  }

  return (
    <div className="container">
      <Title type="h1" className="mt-10 text-center">
        История заказов
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <OrderFilterMobile />
      <div className="flex gap-[95px] mt-8 lg:mt-10">
        <OrderFilterDesktop />

        <div className="flex flex-col gap-[30px] w-full lg:w-[960px]">
          {orders?.individual.map((order) => (
            <OrderHistoryElem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
