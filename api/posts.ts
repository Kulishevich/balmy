import { NewsI } from "@/types/news";

export async function getAllPosts(token: string): Promise<NewsI[] | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client-news`;

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
      console.log("Ошибка при получении новостей пользователя");
      return null;
    }

    const { data } = (await res.json()) as { data: NewsI[] };
    return data;
  } catch (error) {
    console.error("Ошибка при получении новостей пользователя:", error);
    return null;
  }
}

export async function getClientPosts(token: string): Promise<NewsI[] | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/client-news`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: token ? `${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Ошибка при получении новостей пользователя");
      return null;
    }

    const { data } = (await res.json()) as { data: NewsI[] };
    return data;
  } catch (error) {
    console.error("Ошибка при получении новостей пользователя:", error);
    return null;
  }
}

export async function getPostById(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client-news/${id}`;
  console.log(url);
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Ошибка при получении новости по id");
      return null;
    }

    const data = (await res.json()) as NewsI;
    return data;
  } catch (error) {
    console.error("Ошибка при получении новости по id:", error);
    return null;
  }
}

export async function createNewPost({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/client-news`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка API: ${res.status} — ${message}`);
    }

    const order = await res.json();
    return order;
  } catch (err) {
    console.error("Ошибка при отправке заказа:", err);
    throw err;
  }
}

export async function likePost(token: string, id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/client/client-news/${id}/like`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Ошибка API: ${res.status} — ${message}`);
    }

    const order = await res.json();
    return order;
  } catch (err) {
    console.error("Ошибка при отправке заказа:", err);
    throw err;
  }
}
