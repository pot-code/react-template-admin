import { ComponentType } from "react"

class ViewManager {
  private modules = import.meta.glob("@/views/**/*.tsx")

  getViewComponent(viewPath: string) {
    return this.modules[viewPath] as () => Promise<{ default: ComponentType<any> }>
  }
}

export default ViewManager
