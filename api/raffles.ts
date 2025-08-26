import {
  IActiveRaffle,
  IActiveRaffleLider,
  IActiveRafflePrize,
} from "@/types/raffle";

export async function getActiveRaffle(
  token: string
): Promise<IActiveRaffle | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/raffle/current`;

  try {
    const res = await fetch(url, {
      // next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Ошибка при получении активного розыгрыша");
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении активного розыгрыша:", error);
    return null;
  }
}

export async function getActiveRafflePrize(
  token: string
): Promise<IActiveRafflePrize | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/raffle/prize`;

  try {
    const res = await fetch(url, {
      // next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Ошибка при получении активного розыгрыша");
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении активного розыгрыша:", error);
    return null;
  }
}

export async function getActiveRaffleLider(
  token: string
): Promise<IActiveRaffleLider | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/raffle/leader/mock`;

  try {
    const res = await fetch(url, {
      // next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Ошибка при получении активного розыгрыша");
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении активного розыгрыша:", error);
    return null;
  }
}
