import { create } from "zustand"
import { RouteSchema } from "./type"

interface RouterState {
  schemas: RouteSchema[]
  setSchemas: (routes: RouteSchema[]) => void
}

const useRouterStore = create<RouterState>((set) => ({
  schemas: [],
  setSchemas: (schemas) => {
    set({ schemas })
  },
}))

export default useRouterStore
