"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { privacyPolicy } from "@/docs/privacy-policy";
import { useSSR } from "@/hooks/use-ssr";

function PrivacyPolicyPage() {
  const isSSR = useSSR();
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Политика конфиденциальности
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        {!isSSR && (
          <div
            className="docs mt-8 sm:mt-10"
            dangerouslySetInnerHTML={{
              __html: privacyPolicy,
            }}
          />
        )}
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
