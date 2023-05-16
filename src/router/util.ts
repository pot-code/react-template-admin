import { isEmpty } from "lodash-es"
import { RouteSchema } from "./schema/type"

export function setLocalRouteSchemaId(node: RouteSchema, parentId: string, currentIndex: number) {
  if (!node.id) {
    node.id = isEmpty(parentId) ? `${currentIndex}` : `${parentId}-${currentIndex}`
  }
  if (node.children) {
    node.children.forEach((child, index) => {
      setLocalRouteSchemaId(child, node.id!, index)
    })
  }
}
