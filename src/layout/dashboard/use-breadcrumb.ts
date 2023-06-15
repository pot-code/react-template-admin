import { last } from "lodash-es"
import { useMatches } from "react-router-dom"
import { RouteSchema } from "@/core/route"
import useSchemaStore from "@/store/use-schema-store"

function schemaToBreadcrumbItem(schema?: RouteSchema) {
  if (schema) {
    return {
      title: schema.label,
    }
  }
  return null
}

export default function useBreadcrumb() {
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)

  const items = useMemo(
    () =>
      matches
        .slice(1)
        .map((v) => schemas.find((schema) => schema.id === v.id))
        .filter(Boolean)
        .map(schemaToBreadcrumbItem) as { title: string }[],
    [matches, schemas],
  )
  const current = last(items)

  return { current, items }
}
