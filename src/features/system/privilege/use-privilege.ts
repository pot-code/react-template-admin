import { TableProps, TreeProps } from "antd"
import { useToggle } from "@react-hookz/web"
import { useMutation } from "@tanstack/react-query"
import { RouteSchema } from "@/core/route"
import usePagination from "@/hooks/use-pagination"
import useMenuTree from "../menu/use-menu-tree"
import useFetchPrivilege from "./use-fetch-privilege"
import { Privilege } from "./types"
import { privilegeApi } from "./api"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()

  const [showCreateModal, toggleShowCreateModal] = useToggle(false)
  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const { paginationParams, changePagination } = usePagination({ page: 1, pageSize: 10 })
  const { data, pagination, isLoading } = useFetchPrivilege({
    menuId: selectedMenu?.id,
    ...paginationParams,
  })

  const { mutate: createPrivilege, isLoading: isCreating } = useMutation(privilegeApi.create, {
    onSuccess() {
      toggleShowCreateModal(false)
    },
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

  function onCreatePrivilege(submitData: Privilege) {
    if (!selectedMenu) return

    submitData.menuId = selectedMenu?.id
    createPrivilege(submitData)
  }

  return {
    data,
    pagination,
    treeNodes,
    selectedMenu,
    isLoading,
    isCreating,
    showCreateModal,
    changePagination,
    onChange,
    onTreeNodeSelect,
    onAddPrivilege,
    onCreateCancel,
    onCreatePrivilege,
  }
}
