export interface INews {
  approved_at: string;
  author_client_id: string;
  content: string;
  created_at: string;
  id: number;
  moderation_comment: string | null;
  photo_path: string | null;
  published_at: string;
  rejected_at: string | null;
  status: string;
  subtitle: string | null;
  tags: null;
  title: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
  };
  liked_by_me: boolean;
  likes_count: string;
}

export interface IAllNewsResponse {
  current_page: number;
  data: INews[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
