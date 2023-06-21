import { last } from "lodash-es"
import { useMatches } from "react-router-dom"
import useSchemaStore from "@/store/use-schema-store"
import { RouteSchema } from "@/router"

function schemaToBreadcrumbItem(schema: RouteSchema) {
  return {
    title: schema.label,
  }
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
        .map((v) => schemaToBreadcrumbItem(v!)),
    [matches, schemas],
  )
  const current = last(items)

  return { current, items }
}
