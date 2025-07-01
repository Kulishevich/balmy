export interface ICreateClientRequest {
  phone: string;
  comment: string;
  full_name: string;
}

export interface ILoginRequest {
  phone: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    client: {
      id: 443;
      name: string;
      email: string | null;
      phone: string;
      company_type: string;
      unp: string | null;
      last_login_at: string;
    };
    token: string;
    token_type: string;
  };
}

export interface IMe {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  company_type: string;
  unp: string | null;
  kpp: string | null;
  ogrn: string | null;
  ogrnip: string | null;
  legal_address: string | null;
  actual_address: string | null;
  postal_address: string | null;
  last_login_at: string;
  created_at: string;
}
