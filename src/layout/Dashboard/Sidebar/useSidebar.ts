import { MenuProps } from "antd"
import { isEmpty } from "lodash-es"
import { useMatches } from "react-router-dom"
import TreeUtil from "@/router/schema/tree-util"
import { RouteSchema } from "@/router/schema/type"
import useSchemaStore from "@/router/schema/useSchemaStore"
import { MenuItem } from "../type"

function routeSchemaToMenuItem(route: RouteSchema) {
  return {
    key: route.id,
    label: route.label,
  } as MenuItem
}

function filterByHiddenInMenu(route: RouteSchema) {
  return !route.hiddenInMenu
}

function sortByOrder(a: RouteSchema, b: RouteSchema) {
  return a.order - b.order
}

function setRouteMapValue(map: Map<string, string>, schema: RouteSchema, parentPath: string) {
  const routePath = isEmpty(parentPath) ? schema.path : `${parentPath}/${schema.path}`.replace("//", "/")
  if (schema.id) map.set(schema.id, routePath)
  if (schema.children) schema.children.forEach((child) => setRouteMapValue(map, child, routePath))
}

export default function useSidebar() {
  const navigate = useNavigate()
  const matches = useMatches()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [openKeys, setOpenKeys] = useState<string[]>()
  const routeMap = useMemo(() => {
    const map = new Map<string, string>()
    if (dashboardSchema) setRouteMapValue(map, dashboardSchema, "")
    return map
  }, [dashboardSchema])
  const items = useMemo(
    () =>
      dashboardSchema
        ? new TreeUtil(dashboardSchema).filter(filterByHiddenInMenu)?.sortBy(sortByOrder).map(routeSchemaToMenuItem)
            .root.children
        : undefined,
    [dashboardSchema],
  )

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
