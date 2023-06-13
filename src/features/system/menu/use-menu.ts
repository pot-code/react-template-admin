import { useToggle } from "@react-hookz/web"
import { ModalProps, TreeProps, message } from "antd"
import * as d3 from "d3"
import { clone, isNil } from "lodash-es"
import { useMutation, useQuery, useQueryClient } from "react-query"
import TreeUtil from "@/utils/tree-util"
import { menuApi } from "@/features/system/menu/api"
import { DASHBOARD_ID } from "./builtins"
import { RouteSchema, TreeNode } from "./types"
import { buildSchemaTree } from "./util"

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
    locked: node.data.locked,
  } as TreeNode
}

export default function useMenu() {
  const [deleteNode, setDeleteNode] = useState<TreeNode>()
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [unSavedSchema, setUnSavedSchema] = useState<RouteSchema>()
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()

  const [showDeleteConfirmModal, toggleShowDeleteConfirmModal] = useToggle(false)
  const [confirmDeleteLoading, toggleConfirmDeleteLoading] = useToggle(false)
  const [showCreateMenuModal, toggleShowCreateMenuModal] = useToggle(false)
  const [confirmCreateLoading, toggleConfirmCreateLoading] = useToggle(false)

  const qc = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate } = useMutation(menuApi.delete)
  const { isLoading } = useQuery(["routes"], () => menuApi.list(), {
    onSuccess({ data }) {
      data
        .filter((v) => isNil(v.parentId))
        .forEach((v) => {
          v.parentId = DASHBOARD_ID
        })
      setSchemas(data)
    },
  })

  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: DASHBOARD_ID, label: "根节点", path: "", order: -1, locked: true }

    const copyOfSchemas = clone(schemas)
    copyOfSchemas.push(virtualRoot)

    const tree = buildSchemaTree(copyOfSchemas)
    return [new TreeUtil(tree).map(routeSchemaToTreeNode).result]
  }, [schemas])

  function onAddChild(node: TreeNode) {
    const parentId = node.key
    const newChildRoute: RouteSchema = {
      parentId,
      path: "",
      label: "未命名",
      order: 1,
    }
    setUnSavedSchema(newChildRoute)
    toggleShowCreateMenuModal(true)
  }

  async function onDeleteNode(node: TreeNode) {
    toggleShowDeleteConfirmModal(true)
    setDeleteNode(node)
  }

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const id = keys[0]
    const found = schemas.find((v) => v.id === id)
    if (found) {
      setSelectedRoute(found)
    }
  }

  const onDeleteModalOk: ModalProps["onOk"] = () => {
    if (deleteNode) {
      const id = deleteNode.key
      toggleConfirmDeleteLoading(true)
      mutate(id, {
        onSuccess() {
          qc.invalidateQueries(["routes"])
          toggleShowDeleteConfirmModal(false)
          toggleConfirmDeleteLoading(false)
          messageApi.success("删除成功")
        },
      })
    }
  }

  const onDeleteModalCancel: ModalProps["onCancel"] = () => {
    toggleShowDeleteConfirmModal(false)
  }

  const onCreateModalOk: ModalProps["onOk"] = () => {}

  const onCreateModalCancel: ModalProps["onCancel"] = () => {
    toggleShowCreateMenuModal(false)
  }

  return {
    contextHolder,
    isLoading,
    showDeleteConfirmModal,
    confirmDeleteLoading,
    showCreateMenuModal,
    confirmCreateLoading,
    unSavedSchema,
    selectedRoute,
    treeNodes,
    onSelect,
    onAddChild,
    onDeleteNode,
    onDeleteModalOk,
    onDeleteModalCancel,
    onCreateModalOk,
    onCreateModalCancel,
  }
}
