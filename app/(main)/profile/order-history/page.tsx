import Action from "@/components/action";
import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import UserIcon from "@/public/icons/user.svg";
import ReceiptIcon from "@/public/icons/receipt-text.svg";

async function PrivacyPolicyPage() {
  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Личный кабинет
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <div className="container">
        <div className="flex gap-[30px] mt-10">
          <button className="w-full h-[300px] flex flex-col items-center justify-center gap-8 bg-gray rounded-[5px] text-[20px] font-[600] hover:bg-light-gold hover:text-black transition">
            <UserIcon /> Личные данные
          </button>
          <button className="w-full h-[300px] flex flex-col items-center justify-center gap-8 bg-gray rounded-[5px] text-[20px] font-[600] hover:bg-light-gold hover:text-black transition">
            <ReceiptIcon /> История заказов
          </button>
        </div>
        <Action className="w-full mt-[30px]" color="white">
          Выйти
        </Action>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
