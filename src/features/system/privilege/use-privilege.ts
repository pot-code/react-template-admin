import { useToggle } from "@react-hookz/web"
import { TreeProps } from "antd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RouteSchema } from "@/core/route"
import useMenuTree from "../menu/use-menu-tree"
import { privilegeApi } from "./api"
import { Privilege } from "./types"
import useFetchPrivilege from "./use-fetch-privilege"

export default function usePrivilege() {
  const [selectedMenu, setSelectedMenu] = useState<RouteSchema>()
  const [draftPrivilege, setDraftPrivilege] = useState<Partial<Privilege>>({})

  const [showCreateModal, toggleShowCreateModal] = useToggle(false)
  const { menus, treeNodes, isVirtualRoot } = useMenuTree()
  const {
    data,
    isLoading: isLoadingPrivilege,
    isSuccess,
  } = useQuery(
    ["privilege", draftPrivilege.id],
    () => privilegeApi.getById(draftPrivilege.id!).then((res) => res.data),
    {
      enabled: Boolean(draftPrivilege.id),
    },
  )
  const { invalidateCache } = useFetchPrivilege()
  const { mutate: createPrivilege, isLoading: isCreating } = useMutation(privilegeApi.create, {
    onSuccess() {
      invalidateCache()
      toggleShowCreateModal(false)
    },
  })

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys) => {
    const menu = menus.find((v) => v.id === keys[0])
    if (menu && !isVirtualRoot(menu)) {
      setSelectedMenu(menu)
    }
  }

  function onAddPrivilege() {
    if (!selectedMenu) return

    setDraftPrivilege({
      menuId: selectedMenu.id,
    })
    toggleShowCreateModal(true)
  }

  function onCreateCancel() {
    toggleShowCreateModal(false)
  }

  function onCreatePrivilege(submitData: Privilege) {
    createPrivilege(submitData)
  }

  useEffect(() => {
    if (isSuccess && data) {
      setDraftPrivilege(data)
    }
  }, [data, isSuccess])

  return {
    isCreating,
    isLoadingPrivilege,
    treeNodes,
    draftPrivilege,
    selectedMenu,
    showCreateModal,
    onTreeNodeSelect,
    onAddPrivilege,
    onCreateCancel,
    onCreatePrivilege,
  }
}
