import { Card, Col, Row, Tree } from "antd"
import type { DataNode, TreeProps } from "antd/es/tree"

const demoTreeData: DataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
    ],
  },
]

export function Menu() {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info)
  }

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info)
  }

  return (
    <Row className="h-full" gutter={8}>
      <Col span={6}>
        <Card title="菜单树" type="inner">
          <Tree onSelect={onSelect} onCheck={onCheck} treeData={demoTreeData} />
        </Card>
      </Col>
      <Col span={18}>
        <Card className="h-full" title="设置" type="inner">
          <Tree checkable onSelect={onSelect} onCheck={onCheck} treeData={demoTreeData} />
        </Card>
      </Col>
    </Row>
  )
}
