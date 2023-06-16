import { Button, Popconfirm, Space, Table, TableProps } from "antd"
import { PaginationProps } from "antd/lib/pagination"
import { Privilege } from "./types"

interface PrivilegeTableProps {
  isLoading?: boolean
  data: Privilege[]
  pagination: PaginationProps
  onEditRow: (row: Privilege) => void
  onDeleteRow: (row: Privilege) => void
  onTableChange: TableProps<Privilege>["onChange"]
}

export default function PrivilegeTable({
  isLoading,
  data,
  pagination,
  onDeleteRow,
  onEditRow,
  onTableChange,
}: PrivilegeTableProps) {
  const columns: TableProps<Privilege>["columns"] = [
    {
      title: "权限标识",
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
          <Button size="small" type="primary" onClick={() => onEditRow(record)}>
            编辑
          </Button>
          <Popconfirm onConfirm={() => onDeleteRow(record)} title="确定删除吗?" placement="topLeft" key={record.id}>
            <Button size="small" danger>
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
