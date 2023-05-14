import * as d3 from "d3"
import { last } from "lodash-es"
import { useMatches } from "react-router-dom"
import useSchemaStore from "@/router/schema/useSchemaStore"

export default function useBreadcrumb() {
  const matches = useMatches()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const schemaTree = useMemo(() => d3.hierarchy(dashboardSchema), [dashboardSchema])
  const items = useMemo(() => {
    const nearestMatch = last(matches)
    const found = schemaTree.find((node) => node.data?.id === nearestMatch?.id)

    if (found) {
      return found
        .ancestors()
        .map((node) => node.data?.label)
        .filter(Boolean)
        .map((title) => ({ title }))
        .reverse()
    }
    return []
  }, [matches, schemaTree])
  const current = last(items)

  return { current, items }
}
