import http from "@/lib/http"
import { RemoteRouteSchema, RouteSchema } from "./types"

export const menuApi = {
  list() {
    return http.get<RemoteRouteSchema[]>("/system/menu", { baseURL: "/mock" })
  },
  delete(routeId: string) {
    return http.delete(`/system/menu/${routeId}`, { baseURL: "/mock" })
  },
  update(payload: RouteSchema) {
    return http.put(`/system/menu`, payload, { baseURL: "/mock" })
  },
  create(payload: RouteSchema) {
    return http.post(`/system/menu`, payload, { baseURL: "/mock" })
  },
}
