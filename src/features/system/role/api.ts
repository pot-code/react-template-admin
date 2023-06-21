import http from "@/core/http"
import { HttpPaginationResponse, PaginationParams } from "@/core/http/pagination"
import { Role } from "./types"

export interface QueryRoleParams {
  name?: string
}

export const roleApi = {
  list(params: QueryRoleParams | PaginationParams, signal?: AbortSignal) {
    return http.get<HttpPaginationResponse<Role>>("/system/role", { params, signal })
  },
  delete(id: number) {
    return http.delete(`/system/role/${id}`)
  },
  createOrUpdate(payload: Role) {
    if (payload.id) {
      return http.put(`/system/role`, payload)
    }
    return http.post(`/system/role`, payload)
  },
}

Object.freeze(roleApi)
