import { useQuery, useQueryClient } from "@tanstack/react-query"
import usePagination, { AntdPaginationParams } from "@/hooks/use-pagination"
import usePaginationData from "@/hooks/use-pagination-data"
import { QueryRoleParams, roleApi } from "./api"

const queryKey = ["system", "role"]

const defaultPagination = () =>
  ({
    showSizeChanger: true,
    current: 1,
    pageSize: 5,
    pageSizeOptions: [5],
  } as AntdPaginationParams)

export default function useFetchRole() {
  const qc = useQueryClient()
  const [queryParams, setQueryParams] = useState<QueryRoleParams>()
  const { pagination, paginationParams, changePagination, setTotalFromResponse } = usePagination(defaultPagination())
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery([...queryKey, queryParams, paginationParams], ({ signal }) =>
    roleApi.list({ ...paginationParams, ...queryParams }, signal).then((res) => res.data),
  )
  const { data } = usePaginationData(response)

  function invalidateCache() {
    qc.invalidateQueries(queryKey)
  }

  function resetPagination() {
    const { current, pageSize } = defaultPagination()
    changePagination(current, pageSize)
  }

  function search(params: QueryRoleParams) {
    setQueryParams(params)
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
    search,
    changePagination,
    resetPagination,
    invalidateCache,
  }
}
