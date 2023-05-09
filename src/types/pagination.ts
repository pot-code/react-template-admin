export interface PaginationResponse<T> {
  count: number
  page: number
  results: T[]
}

export interface PaginationParams {
  page: number
  page_size: number
}

export type OptionalPaginationParams = Partial<PaginationParams>
