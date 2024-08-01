import useGraphql from 'features/job-position/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'

type UseDeleteJobPositionProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteJobPosition(props: UseDeleteJobPositionProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteJobPosition } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteJobPosition,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(note: string) {
    mutate({
      id: id,
      note: note
    })
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteJobPosition

