import { Product } from "./product";

export interface IActiveRaffle {
  raffle: {
    id: 1;
    product_id: string;
    starts_at: string;
    ends_at: string;
    status: string;
    winner_client_id: string | null;
    winning_news_id: string | null;
    winner_likes_count: string | null;
    winner_reach_time: string | null;
  };
  leader: ILeader | null;
}

export interface IActiveRafflePrize {
  product: Product;
  starts_at: string;
  ends_at: string;
}

export interface IActiveRaffleLider {
  success: boolean;
  data: ILeader[];
}

interface ILeader {
  author_articles_count: string;
  status: string;
  news: {
    id: number;
    author_client_id: number;
    title: string;
    subtitle: string;
    content: string;
    published_at: string;
    author: {
      id: number;
      name: string;
    };
  };
  likes_count: 42;
  reach_time: "2025-08-26T13:29:59.536268Z";
}
