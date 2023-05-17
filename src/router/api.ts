import http from "@/lib/http"
import { RemoteRouteSchema } from "./schema/type"

export const routeApi = {
  list() {
    return http.get<RemoteRouteSchema[]>("/routes")
  },
  delete(routeId: string) {
    return http.delete(`/routes/${routeId}`)
  },
}
