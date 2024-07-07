import useGraphql from 'features/interviews/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteInterview(props: UseDeleteInterviewProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidateInterview } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    onError,
    queryString: deleteCandidateInterview,
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
export default useDeleteInterview
