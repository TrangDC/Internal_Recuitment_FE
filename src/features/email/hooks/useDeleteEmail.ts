import useGraphql from 'features/email/domain/graphql/graphql'
import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteEmailTemplateArguments } from 'shared/schema/database/email_template'

type UseDeleteEmailProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteEmail(props: UseDeleteEmailProps) {
  const { id, onSuccess, onError } = props
  const { queryKey, deleteEmail } = useGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteEmailTemplateArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteEmail,
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
export default useDeleteEmail
