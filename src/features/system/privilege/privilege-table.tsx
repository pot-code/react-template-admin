import { Button, Table, TableProps, theme } from "antd"
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

const { useToken } = theme

interface PrivilegeTableProps extends TableProps<Privilege> {
  onAddPrivilege: () => void
}

export default function PrivilegeTable({ onAddPrivilege, ...rest }: PrivilegeTableProps) {
  const {
    token: { margin },
  } = useToken()

  return (
    <div>
      <div style={{ marginBottom: `${margin}px` }}>
        <Button type="primary" onClick={onAddPrivilege}>
          新增
        </Button>
      </div>
      <Table {...rest} columns={columns} />
    </div>
  )
}
