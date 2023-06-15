import { produce } from "immer"
import { isEmpty } from "lodash-es"
import { RouteSchema } from "@/core/route"
import TreeUtil from "@/utils/tree-util"
import useFetchMenu from "./use-fetch-menu"
import { buildSchemaTree, isRootMenu } from "./util"
import { TreeNode } from "./types"

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
    locked: node.data.locked,
  } as TreeNode
}

function sortMenuByOrder(a: d3.HierarchyNode<RouteSchema>, b: d3.HierarchyNode<RouteSchema>) {
  return a.data.order - b.data.order
}

export default function useMenuTree() {
  const virtualRootId = "virtual"
  const virtualRoot: RouteSchema = useMemo(
    () => ({ id: virtualRootId, label: "根节点", path: "", order: -1, locked: true }),
    [],
  )

  const [menus, setMenus] = useState<RouteSchema[]>([])
  const { data, isSuccess } = useFetchMenu()
  const treeNodes = useMemo(
    () =>
      isEmpty(menus)
        ? []
        : [new TreeUtil(buildSchemaTree(menus)).sortBy(sortMenuByOrder).map(routeSchemaToTreeNode).result],
    [menus],
  )

  function isVirtualRoot(id: string): boolean
  function isVirtualRoot(menu: RouteSchema): boolean
  function isVirtualRoot(param: RouteSchema | string) {
    if (typeof param === "string") return param === virtualRootId
    return param.id === virtualRootId
  }

  useEffect(() => {
    if (isSuccess && data) {
      const remote = produce(data, (draft) => {
        draft.filter(isRootMenu).forEach((v) => {
          v.parentId = virtualRootId
        })
        draft.push(virtualRoot)
      })
      setMenus(remote)
    }
  }, [isSuccess, data, virtualRoot])

  return {
    menus,
    treeNodes,
    isVirtualRoot,
  }
}
