import { Dropdown, MenuProps, Modal, ModalProps, Tree, TreeProps, theme } from "antd"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { useToggle } from "@react-hookz/web"
import { TreeNode } from "./types"

const { useToken } = theme

interface TitleEvents {
  onAddChild: (node: TreeNode) => void
  onDeleteNode: (node: TreeNode) => Promise<unknown>
}

interface TitleRenderProp extends TitleEvents {
  data: any
}

function TitleRender({ data, onAddChild, onDeleteNode }: TitleRenderProp) {
  const {
    token: { colorTextTertiary },
  } = useToken()
  const [modal, contextHolder] = Modal.useModal()
  const items = useMemo<MenuProps["items"]>(
    () => [
      {
        label: "添加子菜单",
        key: "addChild",
        onClick: () => onAddChild(data),
      },
      {
        label: "删除菜单",
        key: "deleteNode",
        danger: true,
        onClick: ({ domEvent }) => {
          onDeleteNode(data)
          domEvent.stopPropagation()
        },
      },
    ],
    [data, modal, onAddChild, onDeleteNode],
  )
  const { title, invisible } = data as TreeNode

  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      <div className="flex gap-2 items-center">
        {contextHolder}
        <span>{title}</span>
        {invisible && <AiOutlineEyeInvisible color={colorTextTertiary} />}
      </div>
    </Dropdown>
  )
}

export interface TreeViewProps extends TreeProps, TitleEvents {}

export default function TreeView({ onAddChild, onDeleteNode, ...rest }: TreeViewProps) {
  const [openModal, toggleOpenModal] = useToggle()
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false)
  const [deleteNode, setDeleteNode] = useState<TreeNode>()

  const onDeleteNodeWrapper: TitleEvents["onDeleteNode"] = (node) => {
    toggleOpenModal(true)
    setDeleteNode(node)
    return Promise.resolve()
  }
  const titleRender = useCallback(
    (nodeData: any) => {
      return <TitleRender data={nodeData} onAddChild={onAddChild} onDeleteNode={onDeleteNodeWrapper} />
    },
    [onAddChild],
  )

  const onModalOk: ModalProps["onCancel"] = (e) => {
    if (deleteNode) {
      setModalConfirmLoading(true)
      onDeleteNode(deleteNode).then(() => {
        toggleOpenModal(false)
        setModalConfirmLoading(false)
      })
    }
  }
  const onModalCancel: ModalProps["onCancel"] = (e) => {
    toggleOpenModal(false)
  }

  return (
    <div>
      <Tree titleRender={titleRender} {...rest} />
      <Modal
        title="确认删除"
        okType="danger"
        confirmLoading={modalConfirmLoading}
        open={openModal}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <p>确认删除该菜单？其所有子节点也会一并删除</p>
      </Modal>
    </div>
  )
}
