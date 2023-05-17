export interface TreeNode {
  title: React.ReactNode
  key: string
  invisible: boolean
  children: TreeNode[]
}
