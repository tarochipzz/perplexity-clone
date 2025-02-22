import { create } from "zustand";

export type SearchSource = "Web" | "Academic" | "Social";
export type SearchType =
  | "Auto"
  | "Pro search"
  | "Deep research"
  | "Reasoning with R1"
  | "Reasoning with o3-mini";
export interface SearchResult {
  id: string;
  content: string;
  type: SearchType;
}
export interface SearchThread {
  id: string;
  results: SearchResult[];
  searchTerm: string;
  relatedSearches?: string[][];
}
export interface SpaceSettings {
  title: string;
  instructions?: string;
  description?: string;
}
export interface Space {
  id: string;
  title: string;
  threads: Search[];
  collaborators: string[]; // user ids
  settings: SpaceSettings;
}

interface SearchStore {
  searchThreads: SearchThread[];
  spaces: Space[];
  threadLoading: boolean;
  isStreaming: boolean;
  addSearchThread: (
    search: Omit<SearchThread, "results" | "relatedSearches">
  ) => void;
  setThreadLoading: (loading: boolean) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  getSearchThread: (threadId: string) => SearchThread | undefined;
  addSearchResult: (searchId: string, result: SearchResult) => void;
  addRelatedSearch: (searchId: string, relatedSearch: string[]) => void;
  createSpace: (space: Omit<Space, "id" | "threads">) => void;
  addThreadToSpace: (spaceId: string, thread: SearchThread) => void;
  addCollaborator: (spaceId: string, userId: string) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchThreads: [],
  spaces: [],
  threadLoading: false,
  isStreaming: false,
  setIsStreaming: (isStreaming: boolean) => set({ isStreaming }),

  setThreadLoading: (loading: boolean) => set({ threadLoading: loading }),

  getSearchThread: (threadId) => {
    return get().searchThreads.find((thread) => thread.id === threadId);
  },

  addSearchThread: (search) =>
    set((state) => ({
      searchThreads: [
        {
          ...search,
          results: [],
          relatedSearches: [],
        },
        ...state.searchThreads,
      ],
    })),

  addSearchResult: (searchId, result) =>
    set((state) => ({
      searchThreads: state.searchThreads.map((s) =>
        s.id === searchId ? { ...s, results: [...s.results, result] } : s
      ),
    })),

  addRelatedSearch: (searchId, relatedSearch) =>
    set((state) => ({
      searchThreads: state.searchThreads.map((s) =>
        s.id === searchId
          ? {
              ...s,
              relatedSearches: [...(s.relatedSearches || []), relatedSearch],
            }
          : s
      ),
    })),

  createSpace: (space) =>
    set((state) => ({
      spaces: [
        ...state.spaces,
        { ...space, id: `space-${Date.now()}`, threads: [] },
      ],
    })),

  addThreadToSpace: (spaceId, thread) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId ? { ...s, threads: [...s.threads, thread] } : s
      ),
    })),

  addCollaborator: (spaceId, userId) =>
    set((state) => ({
      spaces: state.spaces.map((s) =>
        s.id === spaceId
          ? { ...s, collaborators: [...s.collaborators, userId] }
          : s
      ),
    })),
}));
