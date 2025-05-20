import { ADDRESS, MAIL, PHONE_NUMBER } from "@/utils/constants";
import Logo from "@/public/icons/logo-light.svg";
import image from "@/public/images/beard-cut.webp";

const OrganizationSchema = () => (
  <div itemScope itemType="http://schema.org/Organization" className="hidden">
    <meta itemProp="name" content="OOO 'Коммерс Коннект' " />
    <meta itemProp="telephone" content={PHONE_NUMBER.value} />
    <meta itemProp="email" content={MAIL.value} />
    <meta itemProp="address" content={ADDRESS.value} />
    <meta itemProp="logo" content={Logo.src} />
    <meta itemProp="image" content={image.src} />
    <meta
      itemProp="description"
      content="Профессиональная косметика для мужчин"
    />
    <meta
      itemProp="legalName"
      content="OOO 'Коммерс Коннект' - Профессиональная косметика для мужчин "
    />
    <link itemProp="url" href="https://balmy.by/contacts" />
    <meta itemProp="sameAs" content="https://www.instagram.com/balmy.hb/" />

    <div
      itemProp="aggregateRating"
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="bestRating" content="5" />
      <meta itemProp="ratingValue" content="4.9" />
      <meta itemProp="ratingCount" content="317" />
    </div>
  </div>
);

export default OrganizationSchema;
