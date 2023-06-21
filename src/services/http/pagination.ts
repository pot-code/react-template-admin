import { omit } from "lodash-es"
import { HttpRestResponse } from "./response"

export interface HttpPaginationResponse<T> extends PaginationResponseParams, HttpRestResponse<T[]> {}

export interface PaginationResponseParams extends PaginationParams {
  total: number
}

export interface PaginationParams {
  page?: number
  pageSize?: number
}

export function getPaginationResponseParams<T>(res: HttpPaginationResponse<T>): PaginationResponseParams {
  return omit(res, "data")
}

export function getPaginationData<T>(res: HttpPaginationResponse<T>) {
  return res.data
}
