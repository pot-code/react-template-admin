import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ThemeMode } from "./type"

interface ThemeState {
  mode: ThemeMode
  compact: boolean
  setThemeMode: (mode: ThemeMode) => void
  setCompact: (compact: boolean) => void
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      mode: ThemeMode.Light,
      compact: false,
      setThemeMode: (mode: ThemeMode) => set({ mode }),
      setCompact: (compact: boolean) => set({ compact }),
    }),
    {
      name: "theme-settings",
    },
  ),
)

export default useThemeStore
