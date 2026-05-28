export interface Activity {
  id: string;
  author: string;
  source: string;
  type: string;
  content: string;
  reactions: number;
  replies: number;
  timestamp: string;
}

// Interfaz del backend (tal como retorna)
export interface CommunityFeedResponse {
  user_name: string;
  content: string;
  channel_name: string;
  original_date: string;
  reactions: number;
}