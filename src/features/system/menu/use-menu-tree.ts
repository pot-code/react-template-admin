import { useToggle } from "@react-hookz/web"
import { DropDownProps, MenuProps, ModalProps, TreeProps, message } from "antd"
import * as d3 from "d3"
import { produce } from "immer"
import { useMutation, useQuery, useQueryClient } from "react-query"
import TreeUtil from "@/utils/tree-util"
import { menuApi } from "@/features/system/menu/api"
import { RouteSchema } from "./schema"
import { TreeNode } from "./types"
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

export default function useMenuTree() {
  const [remoteSchemas, setRemoteSchemas] = useState<RouteSchema[]>([])
  const [newMenuItem, setNewMenuItem] = useState<RouteSchema>()
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()
  const [selectedParentMenu, setSelectedParentMenu] = useState<RouteSchema>()
  const [contextmenuPosition, setContextmenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const [showDeleteConfirmModal, toggleShowDeleteConfirmModal] = useToggle(false)
  const [showCreationModal, toggleShowCreationModal] = useToggle(false)
  const [showContextmenu, toggleShowContextmenu] = useToggle(false)

  const schemas = useMemo(
    () =>
      produce(remoteSchemas, (draft) => {
        draft.push(virtualRoot)
      }),
    [remoteSchemas],
  )
  const treeNodes = useMemo(() => {
    return [new TreeUtil(buildSchemaTree(schemas)).map(routeSchemaToTreeNode).result]
  }, [schemas])

  const qc = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate: deleteSchema, isLoading: isDeleting } = useMutation(menuApi.delete, {
    onSuccess() {
      qc.invalidateQueries(["system", "menu"])
      setSelectedMenu(undefined)
      toggleShowDeleteConfirmModal(false)
      messageApi.success("删除成功")
    },
  })
  const { mutate: updateSchema, isLoading: isUpdating } = useMutation(menuApi.update, {
    onSuccess() {
      qc.invalidateQueries(["system", "menu"])
      messageApi.success("修改成功")
    },
  })
  const { mutate: createSchema, isLoading: isCreating } = useMutation(menuApi.create, {
    onSuccess() {
      qc.invalidateQueries(["system", "menu"])
      toggleShowCreationModal(false)
      messageApi.success("新增成功")
    },
  })

  function onAddChildMenu() {
    if (!selectedParentMenu) return

    const parentId = selectedParentMenu.id
    const newChildSchema: RouteSchema = {
      id: "",
      path: "",
      label: "",
      order: 1,
      parentId,
    }
    setNewMenuItem(newChildSchema)
    toggleShowCreationModal(true)
    toggleShowContextmenu(false)
  }

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const found = schemas.find((v) => v.id === keys[0])
    if (found) {
      setSelectedMenu(found)
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
    toggleShowContextmenu(false)

    const parentMenu = schemas.find((v) => v.id === node.key)
    if (parentMenu) {
      setSelectedParentMenu(parentMenu)
      setContextmenuPosition(getContextmenuPosition(event.target as HTMLElement))
      toggleShowContextmenu(true)
    }
  }

  function onDeleteMenu() {
    if (!selectedParentMenu) return

    toggleShowDeleteConfirmModal(true)
    toggleShowContextmenu(false)
  }

  const onDeleteMenuConfirm: ModalProps["onOk"] = () => {
    if (selectedParentMenu) {
      deleteSchema(selectedParentMenu.id)
    } else {
      toggleShowDeleteConfirmModal(false)
    }
  }

  const onDeleteMenuCancel: ModalProps["onCancel"] = () => {
    toggleShowDeleteConfirmModal(false)
  }

  const onMenuUpdated = (data: RouteSchema) => {
    updateSchema(data)
  }

  const onMenuCreated = (data: RouteSchema) => {
    if (data.parentId === virtualRootId) {
      data.parentId = undefined
    }
    createSchema(data)
  }

  const onCreationCanceled = () => {
    setNewMenuItem(undefined)
    toggleShowCreationModal(false)
  }

  const onContextmenuClose: DropDownProps["onOpenChange"] = (open) => {
    if (!open) toggleShowContextmenu(false)
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
      disabled: selectedParentMenu?.locked,
      danger: true,
      onClick: onDeleteMenu,
    },
  ]

  useQuery(["system", "menu"], () => menuApi.list(), {
    onSuccess({ data }) {
      const remote = produce(data, (draft) => {
        draft.filter(isRootMenu).forEach((v) => {
          v.parentId = virtualRootId
        })
      })
      setRemoteSchemas(remote)
    },
  })

  return {
    isDeleting,
    isUpdating,
    isCreating,
    showDeleteConfirmModal,
    showCreationModal,
    showContextmenu,
    treeNodes,
    newMenuItem,
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
