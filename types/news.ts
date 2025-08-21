export interface NewsI {
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
