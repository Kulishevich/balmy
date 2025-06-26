import { Contacts } from "@/types/contacts";

export async function getContacts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/design/contacts`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Contacts };

  return data;
}
