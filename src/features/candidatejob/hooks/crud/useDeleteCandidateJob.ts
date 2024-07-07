import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'

type UseDeleteCandidateJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteCandidateJob(props: UseDeleteCandidateJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidateJob } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    onError,
    queryString: deleteCandidateJob,
    showErrorMsg: false,
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
export default useDeleteCandidateJob
