import { MenuProps } from "antd"
import * as d3 from "d3"
import { isEmpty } from "lodash-es"
import { useMatches } from "react-router-dom"
import useSchemaStore from "@/features/system/menu/use-schema-store"
import { buildSchemaTree, isDashboardSchema } from "@/features/system/menu/util"
import TreeUtil from "@/utils/tree-util"
import { MenuItem } from "../type"
import { RouteSchema } from "@/features/system/menu/types"

function routeSchemaToMenuItem(node: d3.HierarchyNode<RouteSchema>) {
  return {
    key: node.data.id,
    label: node.data.label,
  } as MenuItem
}

function filterRouteByHiddenInMenu(node: d3.HierarchyNode<RouteSchema>) {
  return !node.data.hiddenInMenu
}

function sortRouteByOrder(a: d3.HierarchyNode<RouteSchema>, b: d3.HierarchyNode<RouteSchema>) {
  return a.data.order - b.data.order
}

function isDashboardNode(node: d3.HierarchyNode<RouteSchema>) {
  return isDashboardSchema(node.data)
}

function setRouteMapValue(map: Map<string, string>, node: d3.HierarchyNode<RouteSchema>, parentPath: string) {
  const schema = node.data
  const routePath = isEmpty(parentPath) ? schema.path : `${parentPath}/${schema.path}`.replace("//", "/")

  if (schema.id) map.set(schema.id, routePath)
  if (node.children) node.children.forEach((child) => setRouteMapValue(map, child, routePath))
}

export default function useSidebar() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()

  const navigate = useNavigate()
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)

  const schemaTree = useMemo(() => buildSchemaTree(schemas), [schemas])
  const routeMap = useMemo(() => {
    const map = new Map<string, string>()
    if (schemaTree) setRouteMapValue(map, schemaTree, "")
    return map
  }, [schemaTree])
  const items = useMemo(() => {
    const dashboard = schemaTree.find(isDashboardNode)?.copy()
    if (dashboard) {
      return new TreeUtil(dashboard)
        .filter(filterRouteByHiddenInMenu)
        ?.sortBy(sortRouteByOrder)
        .map(routeSchemaToMenuItem).result.children
    }
    return []
  }, [schemaTree])

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    const routePath = routeMap.get(key)
    if (routePath) navigate(routePath)
  }

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys)
  }

  useEffect(() => {
    const keys = matches.map((match) => match.id).reverse()
    setSelectedKeys(keys)
    setOpenKeys(keys)
  }, [matches])

  return { items, openKeys, selectedKeys, onSelect, onOpenChange }
}
