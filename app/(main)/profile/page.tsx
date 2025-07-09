import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileNavigation from "@/components/profile-navigation";

async function ProfilePage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  if (!token) {
    redirect("/authorization");
  }

  return (
    <>
      <Title type="h1" className="mt-10 text-center">
        Личный кабинет
      </Title>
      <Breadcrumbs className="mt-4 mx-auto" />
      <ProfileNavigation />
    </>
  );
}

export default ProfilePage;
