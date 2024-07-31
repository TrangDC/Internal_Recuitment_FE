import useGraphql from 'features/role-template/domain/graphql/graphql'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { BaseRecord } from 'shared/interfaces/common'
import { DeleteRoleArgument } from 'shared/schema/database/role'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useDeleteRoleTemplate(props: UseDeleteInterviewProps) {
  const { id, onSuccess } = props
  const { queryKey, deleteRole } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteRoleArgument>({
    mutationKey: [queryKey],
    onSuccess,
    queryString: deleteRole,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(note: string) {
    mutate({
      id,
      note,
    })
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteRoleTemplate
