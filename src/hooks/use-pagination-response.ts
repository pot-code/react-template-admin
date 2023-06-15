import {
  PaginationResponse,
  getPaginationData,
  getPaginationResponseParams,
  toAntdPagination,
} from "@/core/http/pagination"

export default function usePaginationResponse<T>(response?: PaginationResponse<T>) {
  const data = response ? getPaginationData(response) : []
  const pagination = response ? toAntdPagination(getPaginationResponseParams(response)) : undefined

  return {
    data,
    pagination,
  }
}
