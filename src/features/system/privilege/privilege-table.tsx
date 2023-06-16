import { Button, Popconfirm, Space, Table, TableProps } from "antd"
import { Privilege } from "./types"
import usePrivilegeTable from "./use-privilege-table"

interface PrivilegeTableProps {
  menuId?: string
  onEditRow: (row: Privilege) => void
  onDeleteRow: (row: Privilege) => void
}

export default function PrivilegeTable({ menuId, onDeleteRow, onEditRow }: PrivilegeTableProps) {
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
  const { isLoading, data, pagination, onChange } = usePrivilegeTable(menuId)

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={onChange}
    />
  )
}
