export interface RouteSchema {
  id: string
  parentId?: string
  path: string
  element?: React.ReactNode
  label?: string
  index?: boolean
  order: number
  hiddenInMenu?: boolean
  locked?: boolean
  viewPath?: string
}
