import { last } from "lodash-es"
import { RouteSchema } from "@/router/schema/type"
import useSchemaStore from "./schema/useSchemaStore"

export default function useBreadcrumb() {
  const currentLocation = useLocation()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const pathnames = useMemo(() => currentLocation.pathname.split("/").slice(1), [currentLocation.pathname])
  const items = useMemo(() => {
    const result: { title?: string }[] = []
    let schema: RouteSchema | undefined = dashboardSchema
    pathnames.forEach((path) => {
      schema = schema?.children?.find((v) => v.path === path)
      if (schema) result.push({ title: schema.label })
    })
    return result
  }, [dashboardSchema, pathnames])
  const current = last(items)

  return { current, items }
}
