import { HttpPaginationResponse, getPaginationData } from "@/core/http/pagination"

export default function usePaginationData<T>(response?: HttpPaginationResponse<T>) {
  const data = response ? getPaginationData(response) : []

  return {
    data,
  }
}
