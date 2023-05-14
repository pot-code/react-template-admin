export interface RouteSchema {
  id?: string
  path: string
  element?: React.ReactNode
  label?: string
  index?: boolean
  order: number
  hiddenInMenu?: boolean
  children?: RouteSchema[]
}

export interface RemoteRouteSchema extends RouteSchema {
  viewPath: string
  children?: RemoteRouteSchema[]
}
