import { TableProps } from "antd"
import usePagination from "@/hooks/use-pagination"
import { Privilege } from "./types"
import useFetchPrivilege from "./use-fetch-privilege"

export default function usePrivilegeTable(menuId?: string) {
  const { paginationParams, changePagination } = usePagination({ page: 1, pageSize: 10 })
  const { data, pagination, isLoading } = useFetchPrivilege({
    menuId,
    ...paginationParams,
  })

  const onChange: TableProps<Privilege>["onChange"] = ({ current, pageSize }) => {
    changePagination(current, pageSize)
  }

  return {
    data,
    pagination,
    isLoading,
    onChange,
  }
}
