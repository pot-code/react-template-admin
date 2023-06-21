import { useToggle } from "@react-hookz/web"
import { useMutation } from "@tanstack/react-query"
import { TableProps, message } from "antd"
import { Role } from "./types"
import { QueryRoleParams, roleApi } from "./api"
import useFetchRole from "./use-fetch-role"

export default function useRole() {
  const [messageApi, contextHolder] = message.useMessage()
  const [draftRole, setDraftRole] = useState<Partial<Role>>({})
  const [showModal, toggleShowModal] = useToggle(false)

  const { data, pagination, search, changePagination, invalidateCache, resetPagination } = useFetchRole()
  const { mutate: createOrUpdateRole, isLoading: isSubmitting } = useMutation(roleApi.createOrUpdate, {
    onSuccess() {
      invalidateCache()
      toggleShowModal(false)
      messageApi.success("保存成功")
    },
  })
  const { mutate: deleteRole, isLoading: isDeleting } = useMutation(roleApi.delete, {
    onSuccess() {
      resetPagination()
      invalidateCache()
      messageApi.success("删除成功")
    },
  })

  function onAddRole() {
    setDraftRole({})
    toggleShowModal(true)
  }

  function onEditRole(row: Role) {
    setDraftRole(row)
    toggleShowModal(true)
  }

  function onDeleteRole(row: Role) {
    deleteRole(row.id)
  }

  function onModalCancel() {
    toggleShowModal(false)
  }

  function onSubmit(submitData: Role) {
    createOrUpdateRole(submitData)
  }

  function onSearch(query: QueryRoleParams) {
    search(query)
  }

  const onTableChange: TableProps<Role>["onChange"] = ({ current, pageSize }) => {
    changePagination(current, pageSize)
  }

  return {
    isSubmitting,
    isDeleting,
    showModal,
    pagination,
    contextHolder,
    data,
    draftRole,
    onSearch,
    onSubmit,
    onAddRole,
    onEditRole,
    onDeleteRole,
    onTableChange,
    onModalCancel,
  }
}
