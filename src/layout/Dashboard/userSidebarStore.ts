import { isNil } from "lodash-es"
import { create } from "zustand"

interface SidebarState {
  open: boolean
  toggleOpen: (next?: boolean) => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  open: true,
  toggleOpen: (next?) => {
    if (isNil(next)) {
      set(({ open }) => ({ open: !open }))
    } else {
      set(() => ({ open: next }))
    }
  },
}))

export default useSidebarStore
