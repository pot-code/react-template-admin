import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getPaginationData, getPaginationResponseParams } from "@/core/http/pagination"
import { privilegeApi } from "./api"

const queryKey = ["system", "privilege"]

export default function useFetchPrivilege(menuId?: string) {
  const qc = useQueryClient()
  const {
    data: paginationData,
    isLoading,
    isSuccess,
  } = useQuery([...queryKey, menuId], () => privilegeApi.list(menuId!).then((res) => res.data), {
    enabled: !!menuId,
  })
  const pagination = paginationData ? getPaginationResponseParams(paginationData) : undefined
  const data = paginationData ? getPaginationData(paginationData) : []

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
