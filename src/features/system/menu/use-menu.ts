import { useToggle } from "@react-hookz/web"
import { ModalProps, TreeProps, message } from "antd"
import * as d3 from "d3"
import { clone, isEmpty } from "lodash-es"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { produce } from "immer"
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

export default function useMenu() {
  const [deleteNode, setDeleteNode] = useState<TreeNode>()
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [unSavedSchema, setUnSavedSchema] = useState<RouteSchema>()
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()

  const [showDeleteConfirmModal, toggleShowDeleteConfirmModal] = useToggle(false)
  const [showCreateMenuModal, toggleShowCreateMenuModal] = useToggle(false)

  const qc = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate: deleteSchema, isLoading: isDeleting } = useMutation(menuApi.delete, {
    onSuccess() {
      qc.invalidateQueries(["system", "menu"])
      setSelectedRoute(undefined)
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
      toggleShowCreateMenuModal(false)
      messageApi.success("新增成功")
    },
  })

  const treeNodes = useMemo(() => {
    const menus = produce(schemas, (draft) => {
      draft.push(virtualRoot)
    })
    return [new TreeUtil(buildSchemaTree(menus)).map(routeSchemaToTreeNode).result]
  }, [schemas])

  function onAddChild(node: TreeNode) {
    const parentId = node.key
    const newChildRoute: RouteSchema = {
      parentId,
      path: "",
      label: "",
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
      deleteSchema(deleteNode.key)
    } else {
      toggleShowDeleteConfirmModal(false)
    }
  }

  const onDeleteModalCancel: ModalProps["onCancel"] = () => {
    toggleShowDeleteConfirmModal(false)
  }

  const onRouteSchemaCreated = (data: RouteSchema) => {
    if (data.parentId === virtualRootId) {
      data.parentId = undefined
    }
    createSchema(data)
  }

  const onRouteSchemaUpdated = (data: RouteSchema) => {
    updateSchema(data)
  }

  const onCreationCanceled = () => {
    setUnSavedSchema(undefined)
    toggleShowCreateMenuModal(false)
  }

  useQuery(["system", "menu"], () => menuApi.list(), {
    onSuccess({ data }) {
      const remote = produce(data, (draft) => {
        draft.filter(isRootMenu).forEach((v) => {
          v.parentId = virtualRootId
        })
      })
      setSchemas(remote)
    },
  })

  return {
    contextHolder,
    isDeleting,
    isUpdating,
    isCreating,
    showDeleteConfirmModal,
    showCreateMenuModal,
    unSavedSchema,
    selectedRoute,
    treeNodes,
    onSelect,
    onAddChild,
    onDeleteNode,
    onDeleteModalOk,
    onDeleteModalCancel,
    onRouteSchemaCreated,
    onRouteSchemaUpdated,
    onCreationCanceled,
  }
}
