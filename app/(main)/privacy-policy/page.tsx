import { getSettings } from "@/api/settings";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { privacyPolicy } from "@/docs/privacy-policy";

async function PrivacyPolicyPage() {
  const settings = await getSettings();

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Политика конфиденциальности
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        <div
          className="docs mt-8 sm:mt-10 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: settings.privacy_policy.text || privacyPolicy,
          }}
        />
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
