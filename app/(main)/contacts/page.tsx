import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { ADDRESS, MAIL, PHONE_NUMBER } from "@/utils/constants";
import PhoneIcon from "@/public/icons/phone.svg";
import MapPinIcon from "@/public/icons/map-pin.svg";
import MailIcon from "@/public/icons/mail.svg";
import CardIcon from "@/public/icons/card.svg";
import Link from "next/link";
import CallbackSectoin from "@/components/callback-section";
import YandexMap from "@/components/yandex-map";
import OrganizationSchema from "@/components/organization-schema";
import { getContacts } from "@/api/contacts";

async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <>
      <OrganizationSchema />
      <Title type="h1" className="mt-10 text-center">
        Контакты
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <section className="mt-8 sm:mt-10 xl:container flex flex-col xl:flex-row gap-x-12 content-stretch">
        <div className="flex container xl:mx-0 xl:px-0 flex-col gap-y-6 sm:gap-y-9 max-w-[392px] w-full">
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <PhoneIcon className="flex-shrink-0 " />
              Номер телефона
            </p>
            {contacts.phones.map((phone, index) => (
              <Link
                key={index}
                className="mt-3 font-normal"
                href={`tel:${phone}`}
              >
                {phone}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <PhoneIcon className="flex-shrink-0 " />
              Время работы:
            </p>
            <Link className="mt-3 font-normal" href={PHONE_NUMBER.href}>
              {contacts.working_hours}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <MailIcon className="flex-shrink-0 " />
              Эл. почта
            </p>
            <Link
              className="mt-3 font-normal"
              href={contacts.email || MAIL.href}
            >
              {contacts.email}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <MapPinIcon className="flex-shrink-0 " />
              Адрес офиса
            </p>
            <Link
              className="mt-3 font-normal"
              href={ADDRESS.href}
              target="_blank"
            >
              {ADDRESS.value}
              {contacts.address}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <CardIcon className="flex-shrink-0" />
              Реквизиты
            </p>
            <p className="mt-3 font-normal whitespace-pre-line">
              {contacts.company_info}
            </p>
          </div>
        </div>
        <YandexMap className="mt-8 xl:mt-0 h-[327px] sm:h-[565.5px] rounded-[5px]" />
      </section>
      <CallbackSectoin socialLinks={contacts.social_links} />
    </>
  );
}

export default ContactsPage;
