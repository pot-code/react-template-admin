import { last } from "lodash-es"
import { RouteSchema } from "@/router/schema/type"
import useSchemaStore from "@/router/schema/useSchemaStore"
import usePathSegments from "@/router/usePathSegments"

export default function useBreadcrumb() {
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const segments = usePathSegments()
  const items = useMemo(() => {
    const result: { title?: string }[] = []
    let schema: RouteSchema | undefined = dashboardSchema
    segments.forEach((path) => {
      schema = schema?.children?.find((v) => v.path === path)
      if (schema) result.push({ title: schema.label })
    })
    return result
  }, [dashboardSchema, segments])
  const current = last(items)

  return { current, items }
}
