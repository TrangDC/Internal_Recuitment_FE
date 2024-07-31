import useGraphql from 'features/calendars/domain/graphql'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { BaseRecord } from 'shared/interfaces/common'
import { DeleteCandidateInterviewArguments } from 'shared/schema/database/candidate_interview'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useDeleteInterview(props: UseDeleteInterviewProps) {
  const { id, onSuccess } = props
  const { queryKey, deleteCandidateInterview } = useGraphql()
  const { useDeleteReturn } =
    useDeleteResource<DeleteCandidateInterviewArguments>({
      mutationKey: [queryKey],
      onSuccess,
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
