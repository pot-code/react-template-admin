import { last } from "lodash-es"
import { useMatches } from "react-router-dom"
import useSchemaStore from "@/router/schema/use-schema-store"
import { buildSchemaTree } from "@/router/schema/util"

export default function useBreadcrumb() {
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)
  const schemaTree = useMemo(() => buildSchemaTree(schemas), [schemas])
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