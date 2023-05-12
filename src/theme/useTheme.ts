import { theme } from "antd"
import { ThemeMode } from "./type"
import useThemeStore from "./useThemeStore"

export default function useTheme() {
  const { mode, compact, color, setCompact, setThemeMode, setColor } = useThemeStore()

  const algorithm = [
    { enabled: mode === ThemeMode.Dark, value: theme.darkAlgorithm },
    { enabled: compact, value: theme.compactAlgorithm },
  ]
    .filter(({ enabled }) => enabled)
    .map(({ value }) => value)

  function toggleThemeMode(nextMode?: ThemeMode) {
    if (nextMode) setThemeMode(nextMode)
    else setThemeMode(mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)
  }

  function toggleCompactMode(nextMode?: boolean) {
    if (nextMode) setCompact(nextMode)
    else setCompact(!compact)
  }

  return {
    color,
    mode,
    compact,
    algorithm,
    toggleThemeMode,
    toggleCompactMode,
    setColor,
  }
}
