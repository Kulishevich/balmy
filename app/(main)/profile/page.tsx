import Breadcrumbs from "@/components/breadcrumbs";
import Title from "@/components/title";
import { cookies } from "next/headers";
import { getMe, LogoutRequest } from "@/api/auth";
import { redirect } from "next/navigation";
import ProfileNavigation from "@/components/profile-navigation";

async function ProfilePage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  const me = await getMe(token);

  if (!me) {
    await LogoutRequest(token);

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
