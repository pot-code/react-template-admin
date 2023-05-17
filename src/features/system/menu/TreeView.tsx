import { Dropdown, MenuProps, Modal, Tree, TreeProps, theme } from "antd"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { TreeNode } from "./types"

const { useToken } = theme

interface TitleEvents {
  onAddChild: (node: TreeNode) => void
  onDeleteNode: (node: TreeNode) => Promise<void>
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
        onClick: () =>
          modal.confirm({
            title: "确认删除",
            content: "确认删除该菜单？其所有子节点也会一并删除",
            okType: "danger",
            okText: "删除",
            onOk: () => onDeleteNode(data),
          }),
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
  const titleRender = useCallback(
    (nodeData: any) => {
      return <TitleRender data={nodeData} onAddChild={onAddChild} onDeleteNode={onDeleteNode} />
    },
    [onAddChild, onDeleteNode],
  )

  return <Tree titleRender={titleRender} {...rest} />
}
