import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteCandidateArguments } from 'shared/schema/database/candidate'
import useCandidateGraphql from 'features/candidates/domain/graphql/candidate'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteCandidate(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidate } = useCandidateGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteCandidateArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteCandidate,
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
export default useDeleteCandidate
