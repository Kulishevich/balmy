"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { offerContract } from "@/docs/offer-contract";
import { useSSR } from "@/hooks/use-ssr";

function OfferContractPage() {
  const isSSR = useSSR();
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Договор оферты
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        {!isSSR && (
          <div
            className="docs mt-8 sm:mt-10"
            dangerouslySetInnerHTML={{
              __html: offerContract,
            }}
          />
        )}
      </div>
    </>
  );
}

export default OfferContractPage;
