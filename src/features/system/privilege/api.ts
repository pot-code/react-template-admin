import http from "@/core/http"
import { Privilege } from "./types"
import { PaginationParams, HttpPaginationResponse } from "@/core/http/pagination"

export interface QueryPrivilegeParams extends PaginationParams {
  menuId?: string
}

export const privilegeApi = {
  list(params: QueryPrivilegeParams, signal?: AbortSignal) {
    return http.get<HttpPaginationResponse<Privilege>>("/system/privilege", {
      params,
      signal,
    })
  },
  getById(id: number) {
    return http.get<Privilege>(`/system/privilege/${id}`)
  },
  delete(id: number) {
    return http.delete(`/system/privilege/${id}`)
  },
  createOrUpdate(payload: Privilege) {
    if (payload.id) {
      return http.put(`/system/privilege`, payload)
    }
    return http.post(`/system/privilege`, payload)
  },
}

Object.freeze(privilegeApi)
