import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import {
  ADDRESS,
  MAIL,
  PHONE_NUMBER,
  WORK_DAYS,
  WORK_TIME,
} from "@/utils/constants";
import PhoneIcon from "@/public/icons/phone.svg";
import MapPinIcon from "@/public/icons/map-pin.svg";
import MailIcon from "@/public/icons/mail.svg";
import CardIcon from "@/public/icons/card.svg";
import Link from "next/link";
import CallbackSectoin from "@/components/callback-section";
import YandexMap from "@/components/yandex-map";
import CooperationSection from "./cooperation-section";
import OrganizationSchema from "@/components/organization-schema";

function ContactsPage() {
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
              <PhoneIcon className="flex-shrink-0 fill-green" />
              Номер телефона
            </p>
            <Link className="mt-3 font-normal" href={PHONE_NUMBER.href}>
              {PHONE_NUMBER.value}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <PhoneIcon className="flex-shrink-0 fill-green" />
              Время работы:
            </p>
            <Link className="mt-3 font-normal" href={PHONE_NUMBER.href}>
              {WORK_DAYS} {WORK_TIME}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <MailIcon className="flex-shrink-0 fill-green" />
              Эл. почта
            </p>
            <Link className="mt-3 font-normal" href={MAIL.href}>
              {MAIL.value}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <MapPinIcon className="flex-shrink-0 fill-green" />
              Адрес офиса
            </p>
            <Link
              className="mt-3 font-normal"
              href={ADDRESS.href}
              target="_blank"
            >
              {ADDRESS.value}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-[24px] sm:text-[30px] inline-flex items-center gap-2">
              <CardIcon className="flex-shrink-0 fill-green" />
              Реквизиты
            </p>
            <p className="mt-3 font-normal">
              OOO &quot; Коммерс Коннект &quot; <br /> УНП 193716324 <br />{" "}
              220004, РБ, г. Минск, переулок Тучинский 4, пом.13 <br /> В
              торговом реестре с 04 Января 2024 г., № регистрации 570934
            </p>
          </div>
        </div>
        <YandexMap className="mt-8 xl:mt-0 h-[327px] sm:h-[565.5px] rounded-[5px]" />
      </section>
      <CooperationSection />
      <CallbackSectoin />
    </>
  );
}

export default ContactsPage;
