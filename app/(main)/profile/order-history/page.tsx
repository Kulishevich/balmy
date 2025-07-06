import Breadcrumbs from "@/components/breadcrumbs";
import OrderHistoryElem from "@/components/order-history-elem";
import Title from "@/components/title";
import OrderFilterMobile from "@/components/order-history/order-filter-mobile";
import { cookies } from "next/headers";
import { getOrders, getStatuses } from "@/api/orders";
import { getMe, LogoutRequest } from "@/api/auth";
import { redirect } from "next/navigation";
import OrderFilterDesktop from "@/components/order-history/order-filter-desktop";
import { sortOrders } from "@/utils/helper";

async function PrivacyPolicyPage({
  searchParams,
}: {
  searchParams: Promise<{ sort: string; status: string }>;
}) {
  const { sort, status } = await searchParams;

  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  const orders = await getOrders(token);
  const me = await getMe(token);
  const statuses = await getStatuses();

  if (!me) {
    await LogoutRequest(token);

    cookiesStore.delete("token");

    redirect("/authorization");
  }
  console.log("s", orders?.individual[0]);
  const filteredOrders = orders?.individual?.filter((order) =>
    status ? order.status?.code === status : true
  );

  const sortedOrders = sortOrders(filteredOrders ?? [], sort);

  return (
    <div className="container">
      <Title type="h1" className="mt-10 text-center">
        История заказов
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <OrderFilterMobile />
      <div className="flex gap-[95px] mt-8 lg:mt-10">
        <OrderFilterDesktop statuses={statuses} />

        <div className="flex flex-col gap-[30px] w-full lg:w-[960px]">
          {!!sortedOrders?.length ? (
            sortedOrders.map((order) => (
              <OrderHistoryElem key={order.id} order={order} />
            ))
          ) : (
            <p className="text-[21px] leading-[29px] text-center w-full">
              Заказы не найдены :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
