import { getSettings } from "@/api/settings";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";

async function OfferContractPage() {
  const setting = await getSettings();

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Договор оферты
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        <div
          className="docs mt-8 sm:mt-10 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: setting.terms_of_service.text || "",
          }}
        />
      </div>
    </>
  );
}

export default OfferContractPage;
