import useGraphql from 'features/calendars/domain/graphql'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'
import { BaseRecord } from 'shared/interfaces/common'

type UseDeleteInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useDeleteInterview(props: UseDeleteInterviewProps) {
  const { id, onSuccess } = props
  const { queryKey, deleteCandidateInterview } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    queryString: deleteCandidateInterview,
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
