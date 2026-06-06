import { create } from "zustand";

type DraftEdits = {
  [draftId: string]: string; // id -> edited content
};

type DraftStore = {
  edits: DraftEdits;
  setEdit: (draftId: string, content: string) => void;
  clearEdit: (draftId: string) => void;
  clearAllEdits: () => void;
  getEdit: (draftId: string) => string | undefined;
};

export const useDraftStore = create<DraftStore>()((set, get) => ({
  edits: {},
  setEdit: (draftId, content) =>
    set((state) => ({
      edits: { ...state.edits, [draftId]: content },
    })),
  clearEdit: (draftId) =>
    set((state) => {
      const { [draftId]: _, ...rest } = state.edits;
      return { edits: rest };
    }),
  clearAllEdits: () => set({ edits: {} }),
  getEdit: (draftId) => get().edits[draftId],
}));
