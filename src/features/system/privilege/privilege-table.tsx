import { Table, TableProps } from "antd"
import { Privilege } from "./types"

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

interface PrivilegeTableProps extends TableProps<Privilege> {}

export default function PrivilegeTable(props: PrivilegeTableProps) {
  return <Table {...props} columns={columns} />
}
