import { theme } from "antd"
import useThemeStore from "./use-theme-store"

export default function useTheme() {
  const { darkMode, compact, color, setCompact, setDarkMode, setColor } = useThemeStore()

  const algorithm = [
    { enabled: darkMode, value: theme.darkAlgorithm },
    { enabled: compact, value: theme.compactAlgorithm },
  ]
    .filter(({ enabled }) => enabled)
    .map(({ value }) => value)

  function toggleThemeMode(nextMode?: boolean) {
    if (nextMode) setDarkMode(nextMode)
    else setDarkMode(!darkMode)
  }

  function toggleCompactMode(nextMode?: boolean) {
    if (nextMode) setCompact(nextMode)
    else setCompact(!compact)
  }

  return {
    color,
    darkMode,
    compact,
    algorithm,
    toggleThemeMode,
    toggleCompactMode,
    setColor,
  }
}
