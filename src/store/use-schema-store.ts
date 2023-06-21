import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { RouteSchema } from "@/services/route"

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
