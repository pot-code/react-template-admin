import { TableProps } from "antd"
import { Privilege } from "./types"
import useFetchPrivilege from "./use-fetch-privilege"

export default function usePrivilegeTable(menuId?: string) {
  const { isLoading, data, pagination, changePagination } = useFetchPrivilege(menuId)

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
