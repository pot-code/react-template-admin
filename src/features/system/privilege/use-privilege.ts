import { TableProps, TreeProps } from "antd"
import { useToggle } from "@react-hookz/web"
import { RouteSchema } from "@/core/route"
import usePagination from "@/hooks/use-pagination"
import useMenuTree from "../menu/use-menu-tree"
import useFetchPrivilege from "./use-fetch-privilege"
import { Privilege } from "./types"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()

  const [showCreateModal, toggleShowCreateModal] = useToggle(false)
  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const { paginationParams, changePagination } = usePagination({ page: 1, pageSize: 10 })
  const { data, pagination, isLoading } = useFetchPrivilege({
    menuId: selectedMenu?.id,
    ...paginationParams,
  })

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  const onChange: TableProps<Privilege>["onChange"] = ({ current, pageSize }) => {
    changePagination(current, pageSize)
  }

  function onAddPrivilege() {
    toggleShowCreateModal(true)
  }

  function onCreateCancel() {
    toggleShowCreateModal(false)
  }

  return {
    data,
    pagination,
    treeNodes,
    selectedMenu,
    isLoading,
    showCreateModal,
    changePagination,
    onChange,
    onTreeNodeSelect,
    onAddPrivilege,
    onCreateCancel,
  }
}
