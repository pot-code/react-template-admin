import { Button, Popconfirm, Space, Table, TableProps } from "antd"
import { PaginationProps } from "antd/lib/pagination"
import { Role } from "./types"

interface RoleTableProps {
  isLoading?: boolean
  data: Role[]
  pagination: PaginationProps
  onEditRow: (row: Role) => void
  onDeleteRow: (row: Role) => void
  onTableChange: TableProps<Role>["onChange"]
}

export default function RoleTable({
  isLoading,
  data,
  pagination,
  onDeleteRow,
  onEditRow,
  onTableChange,
}: RoleTableProps) {
  const columns: TableProps<Role>["columns"] = [
    {
      title: "角色名",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
    {
      title: "操作",
      render: (_, record) => (
        <Space>
          <Button size="small" type="link" onClick={() => onEditRow(record)}>
            编辑
          </Button>
          <Popconfirm onConfirm={() => onDeleteRow(record)} title="确定删除吗?" placement="topLeft" key={record.id}>
            <Button danger size="small" type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={onTableChange}
    />
  )
}
