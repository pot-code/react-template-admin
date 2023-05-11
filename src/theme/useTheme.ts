import { theme } from "antd"
import { ThemeMode } from "./type"
import useThemeStore from "./useThemeStore"

export default function useTheme() {
  const { mode, compact, setCompact, setThemeMode } = useThemeStore()

  const algorithm = [mode === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm]
  if (compact) algorithm.push(theme.compactAlgorithm)

  function toggleThemeMode(nextMode?: ThemeMode) {
    if (nextMode) setThemeMode(nextMode)
    else setThemeMode(mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)
  }

  function toggleCompactMode(nextMode?: boolean) {
    if (nextMode) setCompact(nextMode)
    else setCompact(!compact)
  }

  return {
    mode,
    compact,
    algorithm,
    toggleThemeMode,
    toggleCompactMode,
  }
}
