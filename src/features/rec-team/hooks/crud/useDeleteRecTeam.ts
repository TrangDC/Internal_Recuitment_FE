import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'
import useGraphql from 'features/rec-team/domain/graphql/graphql'
import { DeleteRecTeamArguments } from 'shared/schema/database/rec_team'

type UseDeleteTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteRecTeam(props: UseDeleteTeamProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteTeam } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteRecTeamArguments>({
    mutationKey: [queryKey],

    onSuccess,
    onError,
    queryString: deleteTeam,
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
export default useDeleteRecTeam
