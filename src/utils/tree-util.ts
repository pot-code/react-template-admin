import { isEmpty } from "lodash-es"

interface TreeLikeObject {
  children?: this[]
}

export default class TreeUtil<T extends TreeLikeObject> {
  constructor(private root: T) {}

  map<R extends TreeLikeObject>(fn: (node: T) => R): TreeUtil<R> {
    const mapHelper = (n: T) => {
      const mapped = fn(n)
      if (n.children) mapped.children = n.children.map(mapHelper)
      return mapped
    }
    this.root = mapHelper(this.root) as unknown as T
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
    return filterHelper(this.root) ? this : undefined
  }

  sortBy(compareFn: (a: T, b: T) => number) {
    const sortHelper = (n: T) => {
      if (n.children) {
        n.children.sort(compareFn)
        n.children.forEach(sortHelper)
      }
    }
    sortHelper(this.root)
    return this
  }

  get result() {
    return this.root
  }
}
