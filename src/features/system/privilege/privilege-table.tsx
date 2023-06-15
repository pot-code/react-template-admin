import { css } from "@emotion/react"
import { Button, Table, TableProps, theme } from "antd"
import { AntdPaginationParams } from "@/core/http/pagination"
import { Privilege } from "./types"

const { useToken } = theme

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

interface PrivilegeTableProps {
  isLoading: boolean
  pagination?: AntdPaginationParams
  data?: Privilege[]
}

export default function PrivilegeTable({ data, pagination, isLoading }: PrivilegeTableProps) {
  const {
    token: { margin },
  } = useToken()
  const tableData = data ?? []

  return (
    <div>
      <div
        className="text-right"
        css={css`
          margin-bottom: ${margin}px;
        `}
      >
        <Button type="primary">新增</Button>
      </div>
      <Table loading={isLoading} columns={columns} dataSource={tableData} pagination={pagination} />
    </div>
  )
}
