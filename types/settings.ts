export interface Settings {
  about: { text: string | null; image: string | null; content_blocks: [] };
  block_status: {
    contacts_enabled: boolean;
    banners_enabled: boolean;
    about_enabled: boolean;
    delivery_payment_enabled: boolean;
    privacy_policy_enabled: boolean;
  };
  colors: {
    primary: string;
    accent: string;
    secondary: string;
    button_secondary: string;
    text: string;
  };
  delivery_payment: {
    delivery_text: string | null;
    payment_text: string | null;
  };
  favicon: string | null;
  feedback_image: string | null;
  logo: string | null;
  privacy_policy: { text: string | null };
}
