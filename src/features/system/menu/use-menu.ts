import { useToggle } from "@react-hookz/web"
import { useMutation } from "@tanstack/react-query"
import { DropDownProps, MenuProps, ModalProps, TreeProps, message } from "antd"
import { menuApi } from "@/features/system/menu/api"
import { RouteSchema } from "@/core/route"
import useFetchMenu from "./use-fetch-menu"
import useMenuTree from "./use-menu-tree"

export default function useMenu() {
  const [draftMenu, setDraftMenu] = useState<RouteSchema>()
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()
  const [rightSelectedMenu, setRightSelectedMenu] = useState<RouteSchema>()
  const [contextmenuPosition, setContextmenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const [openDeleteConfirmModal, toggleOpenDeleteConfirmModal] = useToggle(false)
  const [openCreationModal, toggleOpenCreationModal] = useToggle(false)
  const [openContextmenu, toggleOpenContextmenu] = useToggle(false)

  const [messageApi, contextHolder] = message.useMessage()
  const { invalidateCache } = useFetchMenu()
  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const { mutate: deleteSchema, isLoading: isDeleting } = useMutation(menuApi.delete, {
    onSuccess() {
      invalidateCache()
      setSelectedMenu(undefined)
      toggleOpenDeleteConfirmModal(false)
      messageApi.success("删除成功")
    },
  })
  const { mutate: updateMenu, isLoading: isUpdating } = useMutation(menuApi.update, {
    onSuccess() {
      invalidateCache()
      messageApi.success("修改成功")
    },
  })
  const { mutate: createMenu, isLoading: isCreating } = useMutation(menuApi.create, {
    onSuccess() {
      invalidateCache()
      toggleOpenCreationModal(false)
      messageApi.success("新增成功")
    },
  })

  function onAddChildMenu() {
    if (!rightSelectedMenu) return

    const parentId = rightSelectedMenu.id
    const newChildSchema: RouteSchema = {
      id: "",
      path: "",
      label: "",
      order: 1,
      parentId,
    }
    setDraftMenu(newChildSchema)
    toggleOpenCreationModal(true)
    toggleOpenContextmenu(false)
  }

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  function getContextmenuPosition(ref: HTMLElement) {
    const rect = ref.getBoundingClientRect()
    return {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height,
    }
  }

  const onTreeNodeRightClick: TreeProps["onRightClick"] = ({ event, node }) => {
    toggleOpenContextmenu(false)

    const menu = menus.find((v) => v.id === node.key)
    if (menu) {
      setRightSelectedMenu(menu)
      setContextmenuPosition(getContextmenuPosition(event.target as HTMLElement))
      toggleOpenContextmenu(true)
    }
  }

  function onDeleteMenu() {
    if (!rightSelectedMenu) return

    toggleOpenDeleteConfirmModal(true)
    toggleOpenContextmenu(false)
  }

  const onDeleteMenuConfirm: ModalProps["onOk"] = () => {
    if (rightSelectedMenu) {
      deleteSchema(rightSelectedMenu.id)
    } else {
      toggleOpenDeleteConfirmModal(false)
    }
  }

  const onDeleteMenuCancel: ModalProps["onCancel"] = () => {
    toggleOpenDeleteConfirmModal(false)
  }

  const onMenuUpdated = (menu: RouteSchema) => {
    updateMenu(menu)
  }

  const onMenuCreated = (menu: RouteSchema) => {
    if (menu.parentId && isVirtualRoot(menu.parentId)) {
      menu.parentId = undefined
    }
    createMenu(menu)
  }

  const onCreationCanceled = () => {
    setDraftMenu(undefined)
    toggleOpenCreationModal(false)
  }

  const onContextmenuClose: DropDownProps["onOpenChange"] = (open) => {
    if (!open) toggleOpenContextmenu(false)
  }

  const contextMenuItems: MenuProps["items"] = [
    {
      label: "添加子菜单",
      key: "addChild",
      onClick: onAddChildMenu,
    },
    {
      label: "删除菜单",
      key: "deleteNode",
      disabled: rightSelectedMenu?.locked,
      danger: true,
      onClick: onDeleteMenu,
    },
  ]

  return {
    isDeleting,
    isUpdating,
    isCreating,
    openDeleteConfirmModal,
    openCreationModal,
    openContextmenu,
    treeNodes,
    draftMenu,
    selectedMenu,
    contextMenuItems,
    contextHolder,
    contextmenuPosition,
    onTreeNodeSelect,
    onTreeNodeRightClick,
    onAddChildMenu,
    onDeleteMenu,
    onDeleteMenuConfirm,
    onDeleteMenuCancel,
    onMenuCreated,
    onMenuUpdated,
    onCreationCanceled,
    onContextmenuClose,
  }
}
