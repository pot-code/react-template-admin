import { create } from "zustand"
import { persist } from "zustand/middleware"
import { COLOR_PALETTE } from "./config"

interface ThemeState {
  darkMode: boolean
  compact: boolean
  color: string
  setDarkMode: (darkMode: boolean) => void
  setCompact: (compact: boolean) => void
  setColor: (color: string) => void
}

const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      darkMode: false,
      compact: false,
      color: COLOR_PALETTE[0],
      setDarkMode: (darkMode: boolean) => set({ darkMode }),
      setCompact: (compact: boolean) => set({ compact }),
      setColor: (color: string) => set({ color }),
    }),
    {
      name: "theme-settings",
    },
  ),
)

export default useThemeStore
