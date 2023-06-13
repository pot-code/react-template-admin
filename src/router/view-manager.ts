import { ComponentType } from "react"

const viewSuffix = ".tsx"

export default class ViewManager {
  private viewDir = "/src/views"
  private modules = import.meta.glob("@/views/**/*.tsx")

  getViewComponent(viewPath: string) {
    const path = this.getLocalViewPath(viewPath)
    return this.modules[path] as () => Promise<{ default: ComponentType<any> }>
  }

  private getLocalViewPath(viewPath: string) {
    let path = viewPath

    if (viewPath.startsWith("/")) {
      path = viewPath.slice(1)
    }

    if (!path.endsWith(viewSuffix)) {
      path += viewSuffix
    }

    return `${this.viewDir}/${path}`
  }
}
