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
