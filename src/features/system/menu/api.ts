import http from "@/core/http"
import { HttpRestResponse } from "@/core/http/response"
import { RouteSchema } from "@/core/route"

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
