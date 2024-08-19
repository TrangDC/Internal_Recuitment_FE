import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteCandidateHistoryCallArguments } from 'shared/schema/database/candidate_history_calls'
import useCandidateHistoryCallGraphql from 'features/candidates/domain/graphql/candidateHistoryCall'

type UseDeleteHistoryCallProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteHistoryCall(props: UseDeleteHistoryCallProps) {
  const { id, onSuccess, onError } = props
  const {  deleteCandidateHistoryCall , queryKey } = useCandidateHistoryCallGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteCandidateHistoryCallArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteCandidateHistoryCall,
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
export default useDeleteHistoryCall
