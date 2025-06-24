import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import UserIcon from "@/public/icons/user.svg";
import ReceiptIcon from "@/public/icons/receipt-text.svg";
import Link from "next/link";

async function PrivacyPolicyPage() {
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Личный кабинет
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[30px] mt-10">
          <Link
            href={"/profile/personal-data"}
            className="w-full h-[180px] lg:h-[300px] flex flex-col items-center justify-center gap-[16px] lg:gap-6 bg-gray rounded-[5px] text-[20px] font-[600] hover:bg-light-gold hover:text-black transition"
          >
            <UserIcon className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px]" />
            Личные данные
          </Link>
          <Link
            href={"/profile/order-history"}
            className="w-full h-[180px] lg:h-[300px] flex flex-col items-center justify-center gap-[16px] lg:gap-6 bg-gray rounded-[5px] text-[20px] font-[600] hover:bg-light-gold hover:text-black transition"
          >
            <ReceiptIcon className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px]" />{" "}
            История заказов
          </Link>
        </div>
        <Action className="w-full mt-6 lg:mt-[30px]" color="white">
          Выйти
        </Action>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
