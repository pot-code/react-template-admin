import { produce } from "immer"
import { PaginationProps } from "antd"
import { PaginationParams, PaginationResponse } from "@/core/http/pagination"

export type AntdPaginationParams = Pick<
  PaginationProps,
  "showSizeChanger" | "showTotal" | "current" | "pageSize" | "pageSizeOptions" | "total"
>

function toPaginationParams(pagination: AntdPaginationParams): PaginationParams {
  return {
    page: pagination.current,
    pageSize: pagination.pageSize,
  }
}

export default function usePagination(defaultPagination: AntdPaginationParams) {
  const [antdPagination, setAntdPagination] = useState<AntdPaginationParams>(defaultPagination)
  const paginationParams = toPaginationParams(antdPagination)

  function changePagination(page?: number, pageSize?: number) {
    setAntdPagination(
      produce((draft) => {
        if (page) {
          draft.current = page
        }
        if (draft.pageSize !== pageSize) {
          draft.current = 1
        }
        if (pageSize) {
          draft.pageSize = pageSize
        }
      }),
    )
  }

  function setTotalFromResponse<T>(response: PaginationResponse<T>) {
    setAntdPagination(
      produce((draft) => {
        draft.total = response.total
      }),
    )
  }

  return {
    pagination: antdPagination,
    paginationParams,
    setTotalFromResponse,
    changePagination,
  }
}
