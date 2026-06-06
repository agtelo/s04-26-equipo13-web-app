export interface PublishPayload {
  id: string | number;
  content: string;
  typeContent: "bluesky" | "twitter" | "reddit" | "newsletter";
}
