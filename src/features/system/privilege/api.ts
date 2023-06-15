import http from "@/core/http"
import { Privilege } from "./types"
import { PaginationParams, PaginationResponse } from "@/core/http/pagination"

export interface QueryPrivilegeParams extends PaginationParams {
  menuId?: string
}

export const privilegeApi = {
  list(params: QueryPrivilegeParams) {
    return http.get<PaginationResponse<Privilege>>("/system/privilege", {
      params,
    })
  },
  delete(id: string) {
    return http.delete(`/system/privilege/${id}`)
  },
  update(payload: Privilege) {
    return http.put(`/system/privilege`, payload)
  },
  create(payload: Privilege) {
    return http.post(`/system/privilege`, payload)
  },
}
