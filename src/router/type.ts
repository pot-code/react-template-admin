export interface RouteItem {
  path: string
  label?: string
  index?: boolean
  icon?: React.ReactNode
  element?: React.ReactNode
  children?: RouteItem[]
}
