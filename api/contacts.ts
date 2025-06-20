import { Contacts } from "@/types/contacts";

export async function getContacts() {
  const url = `https://balmy.webspaceteam.site/api/v1/design/contacts`;
  const res = await fetch(url, { cache: "no-store" });
  const clonedResponse = res.clone();
  const { data } = (await clonedResponse.json()) as { data: Contacts };

  return data;
}
