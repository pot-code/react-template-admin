import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ThemeMode } from "./type"

interface ThemeState {
  mode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      mode: ThemeMode.Light,
      setThemeMode: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: "theme-store",
    },
  ),
)

export default useThemeStore
