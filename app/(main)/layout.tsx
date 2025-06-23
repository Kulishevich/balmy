import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import CategoryBar from "@/components/category-bar";
import Footer from "@/components/footer";
import Popups from "@/components/popups";
import MobileMenu from "@/components/mobile-menu/menu";
import { getCategories } from "@/api/category";
import SearchMobile from "@/components/search/mobile";
import { getSettings } from "@/api/settings";
import { getContacts } from "@/api/contacts";
import { getBrands } from "@/api/brands";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  const settings = await getSettings();
  const contacts = await getContacts();
  const brands = await getBrands();

  return (
    <div className="transform origin-top md:scale-[0.9] 2xl:scale-[1] relative">
      <Navigation phones={contacts.phones} logo={settings.logo} />
      <SearchMobile />
      <Header phones={contacts.phones} logo={settings.logo} />
      <CategoryBar categories={categories} brands={brands} />
      {children}
      <Footer
        logo={settings.logo}
        categories={categories}
        contacts={contacts}
      />
      <Popups brands={brands} />
      <MobileMenu categories={categories} />
    </div>
  );
}
