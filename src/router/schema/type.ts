export interface RouteSchema {
  path: string
  element?: React.ReactNode
  label?: string
  index?: boolean
  hiddenInMenu?: boolean
  children?: RouteSchema[]
}

export interface RemoteRouteSchema extends RouteSchema {
  viewPath: string
  children?: RemoteRouteSchema[]
}
