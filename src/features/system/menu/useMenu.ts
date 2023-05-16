import { useQuery } from "react-query"
import { TreeProps } from "antd"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/router/schema/tree-util"

type RouteMap = Map<string, RouteSchema>

interface TreeNode {
  title: string
  key: string
  children: TreeNode[]
}

function routeSchemaToTreeNode(schema: RouteSchema) {
  return {
    title: schema.label,
    key: schema.id,
  } as TreeNode
}

function setRouteMapValue(map: RouteMap, schema: RouteSchema) {
  map.set(schema.id!, schema)
  if (schema.children) {
    schema.children.forEach((child) => setRouteMapValue(map, child))
  }
}

export default function useMenu() {
  const [routeData, setRouteData] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()
  const routeMap = useMemo(() => {
    const map: RouteMap = new Map()
    routeData.forEach((schema) => setRouteMapValue(map, schema))
    return map
  }, [routeData])
  const treeRenderData = useMemo(() => {
    const virtualRoot: RouteSchema = { path: "", order: -1, children: routeData }
    return new TreeUtil(virtualRoot).map(routeSchemaToTreeNode).root.children
  }, [routeData])

  const { isLoading } = useQuery(["menus"], () => routeApi.list(), {
    onSuccess({ data }) {
      setRouteData(data)
    },
  })

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const matchRoute = routeMap.get(keys[0].toString())
    setSelectedRoute(matchRoute)
  }

  return { isLoading, selectedRoute, treeRenderData, onSelect }
}
