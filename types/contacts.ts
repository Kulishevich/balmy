export interface Contacts {
  address: string | null;
  bank_details: string | null;
  company_description: string | null;
  company_info: string | null;
  email: string | null;
  phones: string[] | [];
  social_links: ISocailLinks;
  working_hours: string | null;
}

export interface ISocailLinks {
  instagram: string | null;
  telegram: string | null;
  whatsapp: string | null;
  viber: string | null;
}
