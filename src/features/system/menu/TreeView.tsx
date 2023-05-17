import { Dropdown, MenuProps, Tree, TreeProps, theme } from "antd"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { TreeNode } from "./types"
import { VIRTUAL_ROOT_ID } from "./config"

const { useToken } = theme

interface TitleEvents {
  onAddChild: (node: TreeNode) => void
  onDeleteNode: (node: TreeNode) => void
}

interface TitleRenderProp extends TitleEvents {
  data: TreeNode
}

function TitleRender({ data, onAddChild, onDeleteNode }: TitleRenderProp) {
  const {
    token: { colorTextTertiary },
  } = useToken()
  const items = useMemo<MenuProps["items"]>(
    () => [
      {
        label: "添加子菜单",
        key: "addChild",
        onClick: ({ domEvent }) => {
          onAddChild(data)
          domEvent.stopPropagation()
        },
      },
      {
        label: "删除菜单",
        key: "deleteNode",
        disabled: data.key === VIRTUAL_ROOT_ID,
        danger: true,
        onClick: ({ domEvent }) => {
          onDeleteNode(data)
          domEvent.stopPropagation()
        },
      },
    ],
    [data, onAddChild, onDeleteNode],
  )
  const { title, invisible } = data as TreeNode

  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      <div className="flex gap-2 items-center">
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

  return (
    <div>
      <Tree titleRender={titleRender} {...rest} />
    </div>
  )
}
