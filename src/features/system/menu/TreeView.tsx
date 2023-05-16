import { Tree, TreeProps } from "antd"

export interface TreeViewProps extends TreeProps {}

export default function TreeView(props: TreeViewProps) {
  return <Tree {...props} />
}
