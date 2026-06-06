export interface ApprovedDraft {
  id: number;
  typeContent: "newsletter" | "twitter" | "bluesky";
  content: string;
  is_published: boolean;
  message_count: number;
  createdAt: string;
  updatedAt: string;
}
