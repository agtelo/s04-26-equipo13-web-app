import { create } from "zustand";
import { DraftI } from "@/interfaces";

type DraftStore = {
  drafts: Array<DraftI>;
  setDrafts: (drafts: Array<DraftI>) => void;
  updatedDraftContent: (typeContent: string, content: string) => void;
  publishDraft: (id: string, content: string) => void;
};

export const useDraftStore = create<DraftStore>()((set) => ({
  drafts: [],
  setDrafts: (drafts) => set({ drafts }),
  updatedDraftContent: (typeContent, content) =>
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.typeContent === typeContent ? { ...draft, content } : draft,
      ),
    })),
  publishDraft: (id, content) =>
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.id === id ? { ...draft, isPublished: true, content } : draft,
      ),
    })),
}));
