export interface News {
  id: number;
  title:string;
  subtitle: string;
  body: string;
  images: string[];
  date: number;
  slug?: string;
}
