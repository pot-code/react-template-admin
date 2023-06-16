import { useToggle } from "@react-hookz/web"
import { TreeProps, message } from "antd"
import { useMutation } from "@tanstack/react-query"
import { RouteSchema } from "@/core/route"
import useMenuTree from "../menu/use-menu-tree"
import { privilegeApi } from "./api"
import { Privilege } from "./types"
import useFetchPrivilege from "./use-fetch-privilege"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()
  const [draftPrivilege, setDraftPrivilege] = useState<Partial<Privilege>>({})

  const [showModal, toggleShowModal] = useToggle(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const { invalidateCache } = useFetchPrivilege()
  const { mutate: createOrUpdatePrivilege, isLoading: isSubmitting } = useMutation(privilegeApi.createOrUpdate, {
    onSuccess() {
      invalidateCache()
      messageApi.success("保存成功")
      toggleShowModal(false)
    },
  })
  const { mutate: deletePrivilege, isLoading: isDeleting } = useMutation(privilegeApi.delete, {
    onSuccess() {
      invalidateCache()
      messageApi.success("删除成功")
    },
  })

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  function onAddPrivilege() {
    if (!selectedMenu) return

    setDraftPrivilege({
      menuId: selectedMenu.id,
    })
    toggleShowModal(true)
  }

  function onEditPrivilege(row: Privilege) {
    if (!selectedMenu) return

    setDraftPrivilege(row)
    toggleShowModal(true)
  }

  function onDeletePrivilege(row: Privilege) {
    if (!selectedMenu) return

    deletePrivilege(row.id)
  }

  function onModalCancel() {
    toggleShowModal(false)
  }

  function onSubmit(submitData: Privilege) {
    createOrUpdatePrivilege(submitData)
  }

  return {
    isSubmitting,
    isDeleting,
    showModal,
    contextHolder,
    treeNodes,
    draftPrivilege,
    selectedMenu,
    onTreeNodeSelect,
    onSubmit,
    onAddPrivilege,
    onModalCancel,
    onEditPrivilege,
    onDeletePrivilege,
  }
}
