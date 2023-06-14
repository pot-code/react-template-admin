import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { RouteSchema } from "./schema"

interface SchemaState {
  schemas: RouteSchema[]
  setSchemas: (routes: RouteSchema[]) => void
}

const useSchemaStore = create(
  devtools<SchemaState>((set) => ({
    schemas: [],
    setSchemas: (schemas) => {
      set({ schemas })
    },
  })),
)

export default useSchemaStore
