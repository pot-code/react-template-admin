import { MenuProps } from "antd"
import { clone } from "lodash-es"
import useSchemaStore from "@/router/useSchemaStore"
import { filterByHiddenInMenu } from "@/router/util"
import { routeSchemaToMenuItem } from "./util"

export default function useMenu() {
  const navigate = useNavigate()
  const currentLocation = useLocation()
  const schemas = useSchemaStore((state) => state.schemas)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const rootSchema = schemas[0]
  const items = useMemo(
    () => rootSchema.children?.filter(filterByHiddenInMenu).map(routeSchemaToMenuItem),
    [rootSchema],
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
