import "@/styles/globals.css";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import CategoryBar from "@/components/category-bar";
import Footer from "@/components/footer";
import Popups from "@/components/popups";
import MobileMenu from "@/components/mobile-menu/menu";
import { getCategories } from "@/api/category";
import SearchMobile from "@/components/search/mobile";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories } = await getCategories();

  return (
    <div className="transform origin-top md:scale-[0.9] 2xl:scale-[1] relative">
      <Navigation />
      <SearchMobile />
      <Header />
      <CategoryBar categories={categories} />
      {children}
      <Footer categories={categories} />
      <Popups />
      <MobileMenu categories={categories} />
    </div>
  );
}
