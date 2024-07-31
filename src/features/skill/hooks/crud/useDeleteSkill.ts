import useGraphql from 'features/skill/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteSkillArguments } from 'shared/schema/database/skill'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteSkill(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteSkill } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteSkillArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteSkill,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(note: string) {
    mutate({
      id,
      note: note,
    })
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteSkill
