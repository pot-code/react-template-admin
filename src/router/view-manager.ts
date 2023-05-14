import { ComponentType } from "react"

export default class ViewManager {
  private viewDir = "/src/views"
  private modules = import.meta.glob("@/views/**/*.tsx")

  getViewComponent(viewPath: string) {
    const path = this.getLocalViewPath(viewPath)
    return this.modules[path] as () => Promise<{ default: ComponentType<any> }>
  }

  private getLocalViewPath(viewPath: string) {
    if (viewPath.startsWith("/")) return `${this.viewDir}/${viewPath.slice(1)}`
    return `${this.viewDir}/${viewPath}`
  }
}
