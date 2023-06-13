import http from "@/lib/http"
import { RemoteRouteSchema } from "./types"

export const menuApi = {
  list() {
    return http.get<RemoteRouteSchema[]>("/system/menu")
  },
  delete(routeId: string) {
    return http.delete(`/system/menu/${routeId}`)
  },
}
