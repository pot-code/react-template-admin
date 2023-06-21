import http from "@/services/http"
import { HttpRestResponse } from "@/services/http/response"
import { RouteSchema } from "@/router"

export const menuApi = {
  list(signal?: AbortSignal) {
    return http.get<HttpRestResponse<RouteSchema[]>>("/system/menu", { signal })
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

Object.freeze(menuApi)
