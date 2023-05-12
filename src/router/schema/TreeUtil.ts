/* eslint-disable no-underscore-dangle */
import { cloneDeep, isEmpty } from "lodash-es"

interface TreeLikeObject {
  children?: this[]
}

export default class TreeUtil<T extends TreeLikeObject> {
  private _root: T

  constructor(root: T) {
    this._root = cloneDeep(root)
  }

  map<R extends TreeLikeObject>(fn: (node: T) => R): TreeUtil<R> {
    const mapHelper = (n: T) => {
      const mapped = fn(n)
      if (n.children) mapped.children = n.children.map(mapHelper)
      return mapped
    }
    this._root = mapHelper(this._root) as unknown as T
    return this as unknown as TreeUtil<R>
  }

  filter(predict: (node: T) => boolean) {
    const filterHelper = (n: T) => {
      if (!predict(n)) return false
      if (n.children) {
        n.children = n.children.filter(filterHelper)
        if (isEmpty(n.children)) n.children = undefined
      }
      return true
    }
    return filterHelper(this._root) ? this : undefined
  }

  get root() {
    return this._root
  }
}
