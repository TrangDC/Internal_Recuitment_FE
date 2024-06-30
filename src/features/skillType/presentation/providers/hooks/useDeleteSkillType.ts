import useGraphql from 'features/skillType/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteSkillType(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteSkillType } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    onError,
    queryString: deleteSkillType,
    showErrorMsg: false,
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
export default useDeleteSkillType

