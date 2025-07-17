export interface ICreateClientRequest {
  phone: string;
  full_name: string;
  email: string;
  comment: string;
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
  moysklad_id: string;
  id: number;
  name: string;
  email: string | null;
  phone: string;
  company_type: string;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  legal_info: {
    unp: string | null;
    kpp: string | null;
    ogrn: string | null;
    ogrnip: string | null;
    okpo: string | null;
  };
  addresses: {
    legal_address: string | null;
    actual_address: string | null;
    postal_address: string | null;
    full_address: string;
  };
  contact_info: {
    email?: string;
    phone?: string;
  };
}
