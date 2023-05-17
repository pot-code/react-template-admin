import * as d3 from "d3"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ModalProps, TreeProps, message } from "antd"
import { clone, curry } from "lodash-es"
import { produce } from "immer"
import { useToggle } from "@react-hookz/web"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree, setRemoteSchemaParentId } from "@/router/schema/util"
import { TreeNode } from "./types"

const virtualRootId = "virtual"

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
  } as TreeNode
}

function generateLocalRouteId(parentId: string) {
  return `${parentId}-${Date.now()}`
}

export default function useMenu() {
  const [openModal, toggleOpenModal] = useToggle(false)
  const [modalConfirmLoading, toggleModalConfirmLoading] = useToggle(false)
  const [deleteNode, setDeleteNode] = useState<TreeNode>()
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()
  const qc = useQueryClient()
  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: virtualRootId, path: "", order: -1 }
    const copyOfSchemas = clone(schemas)
    copyOfSchemas.push(virtualRoot)
    const tree = buildSchemaTree(copyOfSchemas)
    return new TreeUtil(tree).map(routeSchemaToTreeNode).result.children
  }, [schemas])

  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const remoteSchemas = data.map(curry(setRemoteSchemaParentId)(virtualRootId))
      setSchemas(remoteSchemas)
    },
  })
  const { mutate } = useMutation(routeApi.delete, {
    onSuccess() {
      toggleOpenModal(false)
      toggleModalConfirmLoading(false)
      qc.invalidateQueries(["routes"])
      message.success("删除成功")
    },
  })

  function onAddChild(node: TreeNode) {
    const parentId = node.key
    const newChildRoute: RouteSchema = {
      id: generateLocalRouteId(parentId),
      parentId,
      path: "",
      label: "未命名",
      order: 1,
    }
    setSchemas(
      produce((draft) => {
        draft.push(newChildRoute)
      }),
    )
  }

  async function onDeleteNode(node: TreeNode) {
    toggleOpenModal(true)
    setDeleteNode(node)
  }

  const onSelect: TreeProps["onSelect"] = (keys) => {
    const id = keys[0]
    const found = schemas.find((v) => v.id === id)
    if (found) {
      setSelectedRoute(found)
    }
  }

  const onModalOk: ModalProps["onOk"] = () => {
    if (deleteNode) {
      const nodeId = deleteNode.key
      toggleModalConfirmLoading(true)
      mutate(nodeId)
    }
  }

  const onModalCancel: ModalProps["onCancel"] = () => {
    toggleOpenModal(false)
  }

  return {
    isLoading,
    openModal,
    modalConfirmLoading,
    selectedRoute,
    treeNodes,
    onSelect,
    onAddChild,
    onDeleteNode,
    onModalOk,
    onModalCancel,
  }
}
