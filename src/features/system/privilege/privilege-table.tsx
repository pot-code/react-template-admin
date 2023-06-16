import { Table, TableProps } from "antd"
import { Privilege } from "./types"
import usePrivilegeTable from "./use-privilege-table"

interface PrivilegeTableProps {
  menuId?: string
}

export default function PrivilegeTable({ menuId }: PrivilegeTableProps) {
  const columns: TableProps<Privilege>["columns"] = [
    {
      title: "权限标识",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ]
  const { isLoading, data, pagination, onChange } = usePrivilegeTable(menuId)

  return <Table loading={isLoading} columns={columns} dataSource={data} pagination={pagination} onChange={onChange} />
}
