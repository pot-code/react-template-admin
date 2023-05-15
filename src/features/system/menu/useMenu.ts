import { useQuery } from "react-query"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/router/schema/tree-util"

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

export default function useMenu() {
  const { data, isLoading } = useQuery(["dashboard-menus"], () => routeApi.list())
  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { path: "", order: -1, children: data?.data }
    return new TreeUtil(virtualRoot).map(routeSchemaToTreeNode).root.children
  }, [data])

  return { treeNodes, isLoading }
}
