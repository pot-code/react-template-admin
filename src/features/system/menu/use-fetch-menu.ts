import { useQuery, useQueryClient } from "@tanstack/react-query"
import { menuApi } from "./api"

const queryKey = ["system", "menu"]

export default function useFetchMenu() {
  const qc = useQueryClient()
  const { data, isSuccess, isLoading } = useQuery(queryKey, () => menuApi.list().then((res) => res.data))

  function invalidateCache() {
    qc.invalidateQueries(queryKey)
  }

  return {
    data,
    isLoading,
    isSuccess,
    invalidateCache,
  }
}
