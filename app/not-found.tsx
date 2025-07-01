import { getBrands } from "@/api/brands";
import { getCategories } from "@/api/category";
import { getContacts } from "@/api/contacts";
import { getSettings } from "@/api/settings";
import Action from "@/components/action";
import CategoryBar from "@/components/category-bar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MobileMenu from "@/components/mobile-menu/menu";
import Navigation from "@/components/navigation";
import PhoneAnimation from "@/components/phone-animation/PhoneAnimation";
import Popups from "@/components/popups";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SearchMobile from "@/components/search/mobile";
import NotFoundIcon from "@/public/icons/404.svg";

async function NotFoundPage() {
  const categories = await getCategories();
  const settings = await getSettings();
  const contacts = await getContacts();
  const brands = await getBrands();

  return (
    <div className="relative">
      <Navigation phones={contacts.phones} logo={settings.logo} />
      <SearchMobile />
      <Header contacts={contacts} logo={settings.logo} />
      <CategoryBar categories={categories} brands={brands || []} />
      <div className="container relative flex flex-col items-center my-auto lg:mt-[120px] mt-[300px] max-w-[824px] mx-auto">
        <NotFoundIcon className="-translate-y-full lg:translate-y-0 lg:top-0 top-16 absolute scale-50 lg:relative lg:scale-100" />
        <p className="text-center text-[18px] lg:text-[26px]">
          К сожалению, страница не найдена. Возможно, она была удалена или Вы
          ввели некорректный адрес.
        </p>
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row gap-3 mx-auto max-w-[300px] lg:max-w-full w-full justify-center">
          <Action
            type="link"
            href="/"
            className="max-w-[300px] w-full"
            size="big"
            color="white"
          >
            Перейти на главную
          </Action>
        </div>
      </div>
      <Footer
        logo={settings.logo}
        categories={categories}
        contacts={contacts}
      />
      <Popups brands={brands || []} />
      <MobileMenu categories={categories} contacts={contacts} />
      <PhoneAnimation />
      <ScrollToTopButton />
    </div>
  );
}

export default NotFoundPage;
