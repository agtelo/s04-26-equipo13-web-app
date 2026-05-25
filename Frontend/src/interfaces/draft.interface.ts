export interface Draft {
  content: string;
  status: string;
}

export interface DraftI {
  id: string;
  typeContent: string;
  content: string;
  is_published: boolean;
}
