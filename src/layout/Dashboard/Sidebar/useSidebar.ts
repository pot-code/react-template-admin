import { MenuProps } from "antd"
import { clone } from "lodash-es"
import { filterByHiddenInMenu, routeSchemaToMenuItem } from "./util"
import useSchemaStore from "@/router/schema/useSchemaStore"
import TreeUtil from "@/router/schema/TreeUtil"

export default function useSidebar() {
  const navigate = useNavigate()
  const currentLocation = useLocation()
  const dashboardSchema = useSchemaStore((state) => state.dashboardSchema)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const items = useMemo(
    () =>
      dashboardSchema
        ? new TreeUtil(dashboardSchema).filter(filterByHiddenInMenu)?.map(routeSchemaToMenuItem).root.children
        : undefined,
    [dashboardSchema],
  )
  const onSelect: MenuProps["onSelect"] = ({ keyPath }) => {
    const hierarchyPath = clone(keyPath).reverse()

    setSelectedKeys(keyPath)
    navigate(hierarchyPath.join("/"))
  }

  useEffect(() => {
    const pathnames = currentLocation.pathname.split("/").slice(1)
    setSelectedKeys(pathnames.reverse())
  }, [currentLocation])

  return { items, selectedKeys, onSelect }
}
