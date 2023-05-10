import { create } from "zustand"
import { RouteSchema } from "./type"

interface SchemaState {
  schemas: RouteSchema[]
  setSchemas: (routes: RouteSchema[]) => void
}

const useSchemaStore = create<SchemaState>((set) => ({
  schemas: [],
  setSchemas: (schemas) => {
    set({ schemas })
  },
}))

export default useSchemaStore
