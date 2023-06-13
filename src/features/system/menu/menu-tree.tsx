import { Dropdown, MenuProps, Tree, TreeProps, theme } from "antd"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { TreeNode } from "./types"

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
        disabled: data.locked,
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
    <Dropdown menu={{ items }} trigger={["hover"]} mouseEnterDelay={0.5}>
      <div className="flex gap-2 items-center">
        <span>{title}</span>
        {invisible && <AiOutlineEyeInvisible color={colorTextTertiary} />}
      </div>
    </Dropdown>
  )
}

export interface MenuTreeProps extends TreeProps, TitleEvents {}

export default function MenuTree({ onAddChild, onDeleteNode, ...rest }: MenuTreeProps) {
  const titleRender = useCallback(
    (nodeData: any) => {
      return <TitleRender data={nodeData} onAddChild={onAddChild} onDeleteNode={onDeleteNode} />
    },
    [onAddChild, onDeleteNode],
  )

  return <Tree titleRender={titleRender} {...rest} />
}