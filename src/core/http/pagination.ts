import { omit } from "lodash-es"

export interface PaginationResponse<T> extends PaginationResponseParams {
  data: T[]
}

export interface PaginationResponseParams extends PaginationParams {
  total: number
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface AntdPaginationParams {
  current: number
  pageSize: number
  total: number
}

export function getPaginationResponseParams<T>(res: PaginationResponse<T>): PaginationResponseParams {
  return omit(res, "data")
}

export function getPaginationData<T>(res: PaginationResponse<T>) {
  return res.data
}

export function toAntdPagination(params: PaginationResponseParams): AntdPaginationParams {
  return {
    current: params.page,
    pageSize: params.pageSize,
    total: params.total,
  }
}
