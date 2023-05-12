import { create } from "zustand"
import { persist } from "zustand/middleware"
import { COLOR_PALETTE } from "./config"
import { ThemeMode } from "./type"

interface ThemeState {
  mode: ThemeMode
  compact: boolean
  color: string
  setThemeMode: (mode: ThemeMode) => void
  setCompact: (compact: boolean) => void
  setColor: (color: string) => void
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      mode: ThemeMode.Light,
      compact: false,
      color: COLOR_PALETTE[0],
      setThemeMode: (mode: ThemeMode) => set({ mode }),
      setCompact: (compact: boolean) => set({ compact }),
      setColor: (color: string) => set({ color }),
    }),
    {
      name: "theme-settings",
    },
  ),
)

export default useThemeStore
