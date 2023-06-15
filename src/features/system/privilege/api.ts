import http from "@/core/http"
import { Privilege } from "./types"
import { PaginationResponse } from "@/core/http/pagination"

export const privilegeApi = {
  list(menuId: string) {
    return http.get<PaginationResponse<Privilege>>("/system/privilege", {
      params: {
        menuId,
      },
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
