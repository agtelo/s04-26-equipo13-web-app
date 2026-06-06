export interface PublishPayload {
  id: string | number;
  content: string;
  typeContent: "newsletter" | "twitter" | "bluesky" | "linkedin" | "reddit";
}
