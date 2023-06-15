import { css } from "@emotion/react"
import { Button, Table, TableProps, theme } from "antd"
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

interface PrivilegeTableProps extends TableProps<Privilege> {}

export default function PrivilegeTable(props: PrivilegeTableProps) {
  const {
    token: { margin },
  } = useToken()

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
      <Table {...props} columns={columns} />
    </div>
  )
}
