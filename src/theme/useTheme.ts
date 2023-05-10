import { ThemeMode } from "./type"
import useThemeStore from "./useThemeStore"

export default function useTheme() {
  const { mode, setThemeMode } = useThemeStore()

  function toggleThemeMode(nextMode?: ThemeMode) {
    if (nextMode) setThemeMode(nextMode)
    else setThemeMode(mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)
  }

  return {
    mode,
    toggleThemeMode,
  }
}
