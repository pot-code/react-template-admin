import { useToggle } from "@react-hookz/web"
import { DropDownProps, MenuProps, ModalProps, TreeProps, message } from "antd"
import * as d3 from "d3"
import { produce } from "immer"
import { cloneDeep, isEmpty } from "lodash-es"
import { useMutation } from "@tanstack/react-query"
import TreeUtil from "@/utils/tree-util"
import { menuApi } from "@/features/system/menu/api"
import { RemoteRouteSchema, RouteSchema } from "./schema"
import { TreeNode } from "./types"
import useFetchMenu from "./use-fetch-menu"
import { buildSchemaTree, isRootMenu } from "./util"

const virtualRootId = "virtual"
const virtualRoot: RouteSchema = { id: virtualRootId, label: "根节点", path: "", order: -1, locked: true }

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
    locked: node.data.locked,
  } as TreeNode
}

function sortMenuByOrder(a: d3.HierarchyNode<RouteSchema>, b: d3.HierarchyNode<RouteSchema>) {
  return a.data.order - b.data.order
}

function isVirtualRoot(schema: RouteSchema) {
  return schema.id === virtualRootId
}

export default function useMenu() {
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [draftMenu, setDraftMenu] = useState<RouteSchema>()
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()
  const [rightSelectedMenu, setRightSelectedMenu] = useState<RouteSchema>()
  const [contextmenuPosition, setContextmenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const [openDeleteConfirmModal, toggleOpenDeleteConfirmModal] = useToggle(false)
  const [openCreationModal, toggleOpenCreationModal] = useToggle(false)
  const [openContextmenu, toggleOpenContextmenu] = useToggle(false)

  const [messageApi, contextHolder] = message.useMessage()
  const { data, invalidateCache, isSuccess } = useFetchMenu()
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
  const treeNodes = useMemo(
    () =>
      isEmpty(schemas)
        ? []
        : [new TreeUtil(buildSchemaTree(cloneDeep(schemas))).sortBy(sortMenuByOrder).map(routeSchemaToTreeNode).result],
    [schemas],
  )

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
    const menu = schemas.find((v) => v.id === keys[0])
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

    const menu = schemas.find((v) => v.id === node.key)
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
    if (menu.parentId === virtualRootId) {
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

  useEffect(() => {
    if (isSuccess && data) {
      const remote = produce(data, (draft) => {
        draft.filter(isRootMenu).forEach((v) => {
          v.parentId = virtualRootId
        })
        draft.push(virtualRoot as RemoteRouteSchema)
      })
      setSchemas(remote)
    }
  }, [isSuccess, data])

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
