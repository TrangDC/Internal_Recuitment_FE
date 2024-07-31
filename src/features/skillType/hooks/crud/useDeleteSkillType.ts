import useGraphql from 'features/skillType/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteSkillTypeArguments } from 'shared/schema/database/skill_type'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteSkillType(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteSkillType } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteSkillTypeArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteSkillType,
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
export default useDeleteSkillType
