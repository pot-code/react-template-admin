import { MenuProps } from "antd"
import { clone, isNil } from "lodash-es"
import useRouterStore from "@/router/useRouterStore"
import { routeSchemaToMenuItem } from "./util"

export default function useMenu() {
  const currentLocation = useLocation()
  const navigate = useNavigate()
  const schemas = useRouterStore((state) => state.schemas)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const rootSchema = schemas[0]
  const items = useMemo(() => rootSchema.children?.map(routeSchemaToMenuItem).filter((v) => !isNil(v)), [rootSchema])
  const onSelect: MenuProps["onSelect"] = ({ keyPath }) => {
    const hierarchyPath = clone(keyPath).reverse()

    setSelectedKeys(keyPath)
    navigate(hierarchyPath.join("/"))
  }

  useEffect(() => {
    setSelectedKeys(currentLocation.pathname.split("/").slice(1).reverse())
  }, [currentLocation])

  return { items, selectedKeys, onSelect }
}
