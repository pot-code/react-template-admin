import { produce } from "immer"
import { PaginationParams } from "@/core/http/pagination"

export default function usePagination(defaultPagination: PaginationParams) {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>(defaultPagination)

  function changePagination(page?: number, pageSize?: number) {
    setPaginationParams(
      produce((draft) => {
        if (page) {
          draft.page = page
        }
        if (pageSize) {
          draft.pageSize = pageSize
        }
        if (draft.pageSize !== pageSize) {
          draft.page = 1
        }
      }),
    )
  }

  return {
    paginationParams,
    changePagination,
  }
}
