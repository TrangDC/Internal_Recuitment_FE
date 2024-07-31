import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteCandidateJobArguments } from 'shared/schema/database/candidate_job'

type UseDeleteCandidateJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteCandidateJob(props: UseDeleteCandidateJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidateJob } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteCandidateJobArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteCandidateJob,
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
export default useDeleteCandidateJob
