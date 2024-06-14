import useGraphql from 'features/candidates/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { payloadDelete } from 'shared/hooks/crud-hook/interfaces'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void;
}

function useDeleteSkillType(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteCandidate } = useGraphql()
  const { useDeleteReturn } = useDeleteResource({
    mutationKey: [queryKey],
    id,
    onSuccess,
    onError,
    queryString: deleteCandidate,
    showErrorMsg: false,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(data: payloadDelete) {
    console.log("🚀 ~ onDelete ~ data:", data)
    // mutate(data)
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteSkillType

