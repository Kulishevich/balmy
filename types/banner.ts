export interface Banner {
  button_link: string;
  button_text: string;
  created_at: string;
  id: number;
  is_active: boolean;
  order: number;
  photo_path: string;
  subtitle: string;
  title: string;
  updated_at: string;
}

export interface MainBanner {
  id: number;
  desktop_image: string;
  mobile_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
