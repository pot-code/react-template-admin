export interface RouteSchema {
  id?: string
  parentId?: string
  path: string
  element?: React.ReactNode
  label?: string
  index?: boolean
  order: number
  hiddenInMenu?: boolean
}

export interface RemoteRouteSchema extends RouteSchema {
  viewPath: string
  children?: RemoteRouteSchema[]
}
