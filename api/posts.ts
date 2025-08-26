import { IAllNewsResponse, INews } from "@/types/news";

interface IGetAllPostsProps {
  token: string;
  page?: string;
  per_page?: string;
  search?: string;
  tag?: string;
  sort_by?: string;
  sort_direction?: string;
}

export async function getAllPosts({
  token,
  page = "1",
  per_page = "2",
  search,
  tag,
  sort_by,
  sort_direction,
}: IGetAllPostsProps): Promise<IAllNewsResponse | null> {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page);
  }
  if (per_page) {
    params.append("per_page", per_page);
  }
  if (search) {
    params.append("search", search);
  }
  if (tag) {
    params.append("tag", tag);
  }
  if (sort_by) {
    params.append("sort_by", sort_by);
  }
  if (sort_direction) {
    params.append("sort_direction", sort_direction);
  }

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/client-news?${params.toString()}`;

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

    const data = (await res.json()) as IAllNewsResponse;
    return data;
  } catch (error) {
    console.error("Ошибка при получении новостей пользователя:", error);
    return null;
  }
}

export async function getAllPostsWithoutPagination({
  token,
}: {
  token: string;
}): Promise<IAllNewsResponse | null> {
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

    const data = (await res.json()) as IAllNewsResponse;
    return data;
  } catch (error) {
    console.error("Ошибка при получении новостей пользователя:", error);
    return null;
  }
}

export async function getClientPosts(token: string): Promise<INews[] | null> {
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

    const { data } = (await res.json()) as { data: INews[] };
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

    const data = (await res.json()) as INews;
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
