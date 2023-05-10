import { RouteSchema } from "@/router/type"
import useSchemaStore from "@/router/useSchemaStore"

export default function useBreadcrumb() {
  const currentLocation = useLocation()
  const schemas = useSchemaStore((state) => state.schemas)
  const pathnames = useMemo(() => currentLocation.pathname.split("/").slice(1), [currentLocation.pathname])
  const items = useMemo(() => {
    const result: { title?: string }[] = []
    let schema: RouteSchema | undefined = schemas[0]
    pathnames.forEach((path) => {
      schema = schema?.children?.find((v) => v.path === path)
      if (schema) result.push({ title: schema.label })
    })
    return result
  }, [pathnames, schemas])

  return { items }
}
