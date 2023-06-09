import { Tree, TreeProps, theme } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { TreeNode } from "./types"

const { useToken } = theme

interface TitleRenderProp {
  data: TreeNode
}

function TitleRender({ data }: TitleRenderProp) {
  const {
    token: { colorTextTertiary },
  } = useToken()
  const { title, invisible } = data as TreeNode

  return (
    <div className="flex gap-2 items-center">
      <span>{title}</span>
      {invisible && <EyeOutlined color={colorTextTertiary} />}
    </div>
  )
}

export interface MenuTreeProps extends TreeProps {}

export default function MenuTree({ ...rest }: MenuTreeProps) {
  const titleRender = useCallback((nodeData: any) => <TitleRender data={nodeData} />, [])

  return <Tree titleRender={titleRender} {...rest} />
}
