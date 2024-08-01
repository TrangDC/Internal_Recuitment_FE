import useGraphql from 'features/interviews/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteCandidateInterviewArguments } from 'shared/schema/database/candidate_interview'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteInterview(props: UseDeleteInterviewProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidateInterview } = useGraphql()
  const { useDeleteReturn } =
    useDeleteResource<DeleteCandidateInterviewArguments>({
      mutationKey: [queryKey],
      onSuccess,
      onError,
      queryString: deleteCandidateInterview,
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
export default useDeleteInterview
