import useGraphql from 'features/feedback/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'

type UseDeleteTeamProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteFeedback(props: UseDeleteTeamProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidateJobFeedback } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    onError,
    queryString: deleteCandidateJobFeedback,
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
export default useDeleteFeedback
