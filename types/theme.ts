export interface Theme {
  id: number;
  name:
    | "winter"
    | "autumn"
    | "spring"
    | "green"
    | "rain"
    | "hearts"
    | "eggs"
    | "default";
  is_active: boolean;
  elements_count: number;
}
