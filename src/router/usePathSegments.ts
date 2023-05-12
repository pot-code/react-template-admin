export default function usePathSegments() {
  const currentLocation = useLocation()
  const segments = useMemo(() => currentLocation.pathname.split("/").slice(1), [currentLocation.pathname])
  return segments
}
