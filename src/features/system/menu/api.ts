import http from "@/lib/http"
import { RemoteRouteSchema, RouteSchema } from "./schema"

export const menuApi = {
  list() {
    return http.get<RemoteRouteSchema[]>("/system/menu")
  },
  delete(routeId: string) {
    return http.delete(`/system/menu/${routeId}`)
  },
  update(payload: RouteSchema) {
    return http.put(`/system/menu`, payload)
  },
  create(payload: RouteSchema) {
    return http.post(`/system/menu`, payload)
  },
}
