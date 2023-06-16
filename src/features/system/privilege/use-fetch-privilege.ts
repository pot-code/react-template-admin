import { useQuery, useQueryClient } from "@tanstack/react-query"
import { isNil } from "lodash-es"
import usePagination, { AntdPaginationParams } from "@/hooks/use-pagination"
import usePaginationData from "@/hooks/use-pagination-data"
import { privilegeApi } from "./api"

const queryKey = ["system", "privilege"]

const defaultPagination = () =>
  ({
    showSizeChanger: true,
    current: 1,
    pageSize: 5,
    pageSizeOptions: [5],
  } as AntdPaginationParams)

export default function useFetchPrivilege(menuId?: string) {
  const qc = useQueryClient()
  const { pagination, paginationParams, changePagination, setTotalFromResponse } = usePagination(defaultPagination())
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery(
    [...queryKey, menuId, paginationParams],
    ({ signal }) => privilegeApi.list({ menuId, ...paginationParams }, signal).then((res) => res.data),
    {
      enabled: Boolean(menuId),
    },
  )
  const { data } = usePaginationData(response)

  function invalidateCache() {
    if (!isNil(menuId)) qc.invalidateQueries([...queryKey, menuId])
    else qc.invalidateQueries(queryKey)
  }

  function resetPagination() {
    const { current, pageSize } = defaultPagination()
    changePagination(current, pageSize)
  }

  useEffect(() => {
    if (response && isSuccess) {
      setTotalFromResponse(response)
    }
  }, [response, isSuccess, setTotalFromResponse])

  return {
    isLoading,
    isSuccess,
    data,
    pagination,
    changePagination,
    resetPagination,
    invalidateCache,
  }
}
