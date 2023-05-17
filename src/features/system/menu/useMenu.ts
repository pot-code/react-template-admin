import * as d3 from "d3"
import { useQuery } from "react-query"
import { TreeProps } from "antd"
import { clone, curry } from "lodash-es"
import { produce } from "immer"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree, setRemoteSchemaParentId } from "@/router/schema/util"
import { TreeNode } from "./types"

const virtualRootId = "virtual"

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
  } as TreeNode
}

function generateLocalRouteId(parentId: string) {
  return `${parentId}-${Date.now()}`
}

export default function useMenu() {
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()

  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const remoteSchemas = data.map(curry(setRemoteSchemaParentId)(virtualRootId))
      setSchemas(remoteSchemas)
    },
  })
  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: virtualRootId, path: "", order: -1 }
    const copyOfSchemas = clone(schemas)
    copyOfSchemas.push(virtualRoot)
    const tree = buildSchemaTree(copyOfSchemas)
    return new TreeUtil(tree).map(routeSchemaToTreeNode).result.children
  }, [schemas])

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const id = keys[0]
    const found = schemas.find((v) => v.id === id)
    if (found) {
      setSelectedRoute(found)
    }
  }

  function onAddChild(node: TreeNode) {
    const parentId = node.key
    const newChildRoute: RouteSchema = {
      id: generateLocalRouteId(parentId),
      parentId,
      path: "",
      label: "未命名",
      order: 1,
    }
    setSchemas(
      produce((draft) => {
        draft.push(newChildRoute)
      }),
    )
  }

  function onDeleteNode(node: TreeNode) {
    const parentId = node.key
    setSchemas(
      produce((draft) => {
        return draft.filter((v) => v.id !== parentId && v.parentId !== parentId)
      }),
    )
  }

  return { isLoading, selectedRoute, treeNodes, onSelect, onAddChild, onDeleteNode }
}
