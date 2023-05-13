import { create } from "zustand"
import { RouteSchema } from "./type"

interface SchemaState {
  // schemas: RouteSchema[]
  dashboardSchema: RouteSchema | undefined
  // setSchemas: (routes: RouteSchema[]) => void
  setDashboardSchema: (routes: RouteSchema) => void
}

const useSchemaStore = create<SchemaState>((set) => ({
  // schemas: [],
  dashboardSchema: undefined,
  // setSchemas: (schemas) => {
  //   set({ schemas })
  // },
  setDashboardSchema: (dashboardSchema) => set({ dashboardSchema }),
}))

export default useSchemaStore
