export interface TreeNode {
  title: React.ReactNode
  key: string
  invisible: boolean
  locked?: boolean
  children: TreeNode[]
}
