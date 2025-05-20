"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { deliveryPayment } from "@/docs/delivery-payment";
import { useSSR } from "@/hooks/use-ssr";

function DeliveryPaymentPage() {
  const isSSR = useSSR();
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Доаставка и оплата
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        {!isSSR && (
          <div
            className="docs mt-8 sm:mt-10"
            dangerouslySetInnerHTML={{
              __html: deliveryPayment,
            }}
          />
        )}
      </div>
    </>
  );
}

export default DeliveryPaymentPage;
