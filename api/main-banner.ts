import { MainBanner } from "@/types/banner";

export async function getMainBanner() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/main-banner`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const { data } = (await res.json()) as { data: MainBanner };

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
}
