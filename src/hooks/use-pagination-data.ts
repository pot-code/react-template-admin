import { PaginationResponse, getPaginationData } from "@/core/http/pagination"

export default function usePaginationData<T>(response?: PaginationResponse<T>) {
  const data = response ? getPaginationData(response) : []

  return {
    data,
  }
}
