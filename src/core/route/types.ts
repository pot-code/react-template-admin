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
  children?: RouteSchema[]
}

export interface RemoteRouteSchema extends RouteSchema {
  viewPath: string
  children?: RemoteRouteSchema[]
}
