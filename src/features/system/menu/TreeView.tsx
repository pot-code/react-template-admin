import { Tree, TreeProps } from "antd"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import React from "react"
import { TreeNode } from "./types"

interface TitleRenderProp {
  data: any
}

function TitleRender({ data }: TitleRenderProp) {
  const { title, visible } = data as TreeNode
  return (
    <div className="flex gap-2 items-center">
      <span>{title}</span>
      {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    </div>
  )
}

export interface TreeViewProps extends TreeProps {}

export default function TreeView({ ...rest }: TreeViewProps) {
  const titleRender = useCallback((nodeData: any) => {
    return <TitleRender data={nodeData} />
  }, [])

  return <Tree titleRender={titleRender} {...rest} />
}
