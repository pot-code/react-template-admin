import * as d3 from "d3"
import { useQuery } from "react-query"
import { ModalProps, TreeProps } from "antd"
import { clone, curry } from "lodash-es"
import { produce } from "immer"
import { useToggle } from "@react-hookz/web"
import { routeApi } from "@/router/api"
import { RouteSchema } from "@/router/schema/type"
import TreeUtil from "@/utils/tree-util"
import { buildSchemaTree, setRemoteSchemaParentId } from "@/router/schema/util"
import { TreeNode } from "./types"
import { VIRTUAL_ROOT_ID } from "./config"

const tmpIdPrefix = "tmp-"

let tmpNodeId = 0

function routeSchemaToTreeNode(node: d3.HierarchyNode<RouteSchema>) {
  return {
    title: node.data.label,
    key: node.data.id,
    invisible: node.data.hiddenInMenu,
    locked: node.data.locked,
  } as TreeNode
}

function generateTmpRouteId() {
  return `${tmpIdPrefix}${tmpNodeId++}`
}

export default function useMenu() {
  const [openModal, toggleOpenModal] = useToggle(false)
  const [deleteNode, setDeleteNode] = useState<TreeNode>()
  const [schemas, setSchemas] = useState<RouteSchema[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteSchema>()

  const treeNodes = useMemo(() => {
    const virtualRoot: RouteSchema = { id: VIRTUAL_ROOT_ID, label: "根节点", path: "", order: -1, locked: true }
    const copyOfSchemas = clone(schemas)
    copyOfSchemas.push(virtualRoot)
    const tree = buildSchemaTree(copyOfSchemas)
    return [new TreeUtil(tree).map(routeSchemaToTreeNode).result]
  }, [schemas])

  const { isLoading } = useQuery(["routes"], () => routeApi.list(), {
    onSuccess({ data }) {
      const remoteSchemas = data.map(curry(setRemoteSchemaParentId)(VIRTUAL_ROOT_ID))
      setSchemas(remoteSchemas)
    },
  })

  function onAddChild(node: TreeNode) {
    const parentId = node.key
    const newChildRoute: RouteSchema = {
      id: generateTmpRouteId(),
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
    setSelectedRoute(newChildRoute)
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
      const id = deleteNode.key
      setSchemas(
        produce((draft) => {
          return draft.filter((v) => v.id !== id && v.parentId !== id)
        }),
      )
      toggleOpenModal(false)
    }
  }

  const onModalCancel: ModalProps["onCancel"] = () => {
    toggleOpenModal(false)
  }

  return {
    isLoading,
    openModal,
    selectedRoute,
    treeNodes,
    onSelect,
    onAddChild,
    onDeleteNode,
    onModalOk,
    onModalCancel,
  }
}
