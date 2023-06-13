import * as d3 from "d3"
import { MenuProps } from "antd"
import { isEmpty } from "lodash-es"
import { useMatches } from "react-router-dom"
import TreeUtil from "@/utils/tree-util"
import { RouteSchema } from "@/router/schema/type"
import useSchemaStore from "@/router/schema/use-schema-store"
import { MenuItem } from "../type"
import { buildSchemaTree } from "@/router/schema/util"
import { DASHBOARD_ID } from "@/router/schema/config"

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

function setRouteMapValue(map: Map<string, string>, node: d3.HierarchyNode<RouteSchema>, parentPath: string) {
  const schema = node.data
  const routePath = isEmpty(parentPath) ? schema.path : `${parentPath}/${schema.path}`.replace("//", "/")
  if (schema.id) map.set(schema.id, routePath)
  if (node.children) node.children.forEach((child) => setRouteMapValue(map, child, routePath))
}

export default function useSidebar() {
  const navigate = useNavigate()
  const matches = useMatches()
  const schemas = useSchemaStore((state) => state.schemas)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()
  const routeMap = useMemo(() => {
    const map = new Map<string, string>()
    const tree = buildSchemaTree(schemas)
    if (tree) setRouteMapValue(map, tree, "")
    return map
  }, [schemas])
  const items = useMemo(() => {
    const tree = buildSchemaTree(schemas)
    const dashboard = tree.find((v) => v.data.id === DASHBOARD_ID)
    if (dashboard) {
      return new TreeUtil(dashboard)
        .filter(filterRouteByHiddenInMenu)
        ?.sortBy(sortRouteByOrder)
        .map(routeSchemaToMenuItem).result.children
    }
    return []
  }, [schemas])

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