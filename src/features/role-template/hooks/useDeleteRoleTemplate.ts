import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'
import { BaseRecord } from 'shared/interfaces/common'
import useGraphql from '../domain/graphql/graphql'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useDeleteRoleTemplate(props: UseDeleteInterviewProps) {
  const { id, onSuccess } = props
  const { queryKey, deleteRole } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    queryString: deleteRole,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(data: payloadDelete) {
    mutate(data)
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteRoleTemplate
