import { ComponentType } from "react"

const viewSuffix = ".tsx"

export default class ViewManager {
  private viewDir = "/src/views"
  private rootDir = "/src"
  private modules = import.meta.glob("@/**/*.tsx")

  getViewComponent(viewPath: string) {
    const path = this.getLocalViewPath(viewPath)
    return this.modules[path] as () => Promise<{ default: ComponentType<any> }>
  }

  private getLocalViewPath(viewPath: string) {
    let path = ""

    if (viewPath.startsWith("/")) {
      path = `${this.rootDir}/${viewPath.slice(1)}${viewSuffix}`
    } else {
      path = `${this.viewDir}/${viewPath}${viewSuffix}`
    }

    if (!path.endsWith(viewSuffix)) {
      path += viewSuffix
    }

    return path
  }
}
