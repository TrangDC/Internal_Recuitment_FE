import useGraphql from 'features/teams/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteHiringTeamArguments } from 'shared/schema/database/hiring_team'

type UseDeleteTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteTeam(props: UseDeleteTeamProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteTeam } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteHiringTeamArguments>({
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
export default useDeleteTeam
