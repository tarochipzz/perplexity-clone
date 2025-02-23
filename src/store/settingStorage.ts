// this project has no backend, so this stores persistent settings in localStorage

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalSettingState {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export const useGlobalSettingStateStore = create<GlobalSettingState>()(
  persist(
    (set) => ({
      isExpanded:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("sidebar-storage") || "true").state
              ?.isExpanded ?? true
          : true,
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    }),
    {
      name: "setting-storage",
      storage: {
        getItem: (name) =>
          localStorage.getItem(name)
            ? JSON.parse(localStorage.getItem(name)!)
            : null,
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
