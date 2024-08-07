import useGraphql from 'features/jobs/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteHiringJobArguments } from 'shared/schema/database/hiring_job'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteJob(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteJob } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteHiringJobArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteJob,
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
export default useDeleteJob
