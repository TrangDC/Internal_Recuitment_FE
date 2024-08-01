import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteHiringTeamArguments } from 'shared/schema/database/hiring_team'
import useGraphql from 'features/hiring-team/domain/graphql/graphql'

type UseDeleteHiringTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteHiringTeam(props: UseDeleteHiringTeamProps) {
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
export default useDeleteHiringTeam
