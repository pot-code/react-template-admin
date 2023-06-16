import { useQuery, useQueryClient } from "@tanstack/react-query"
import { isNil } from "lodash-es"
import usePaginationResponse from "@/hooks/use-pagination-response"
import { QueryPrivilegeParams, privilegeApi } from "./api"

const queryKey = ["system", "privilege"]

export default function useFetchPrivilege(params?: QueryPrivilegeParams) {
  const qc = useQueryClient()
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useQuery([...queryKey, params], ({ signal }) => privilegeApi.list(params!, signal).then((res) => res.data), {
    enabled: !isNil(params?.menuId),
  })
  const { data, pagination } = usePaginationResponse(response)

  function invalidateCache() {
    qc.invalidateQueries(queryKey)
  }

  return {
    data,
    pagination,
    isLoading,
    isSuccess,
    invalidateCache,
  }
}
