export interface TreeNode {
  title: React.ReactNode
  key: string
  visible: boolean
  children: TreeNode[]
}
