import { omit } from "lodash-es"

export interface PaginationResponse<T> extends PaginationResponseParams {
  data: T[]
}

export interface PaginationResponseParams extends PaginationParams {
  total: number
}

export interface PaginationParams {
  page?: number
  pageSize?: number
}

export function getPaginationResponseParams<T>(res: PaginationResponse<T>): PaginationResponseParams {
  return omit(res, "data")
}

export function getPaginationData<T>(res: PaginationResponse<T>) {
  return res.data
}
