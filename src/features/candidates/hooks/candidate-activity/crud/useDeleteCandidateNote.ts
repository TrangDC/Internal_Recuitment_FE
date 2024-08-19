import { BaseRecord } from 'shared/interfaces'
import { useDeleteResource } from 'shared/hooks/crud-hook'
import { DeleteCandidateNoteArguments } from 'shared/schema/database/candidate_note'
import useCandidateNoteGraphql from 'features/candidates/domain/graphql/candidateNote'

type UseDeleteJobProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  onError?: (data: BaseRecord) => void
}

function useDeleteCandidateNote(props: UseDeleteJobProps) {
  const { id, onSuccess, onError } = props
  const {  deleteCandidateNote , queryKey } = useCandidateNoteGraphql()
  const { useDeleteReturn } = useDeleteResource<DeleteCandidateNoteArguments>({
    mutationKey: [queryKey],
    onSuccess,
    onError,
    queryString: deleteCandidateNote,
  })

  const { mutate, isPending } = useDeleteReturn

  function onDelete(note: string) {
    mutate({
      id,
      note: note,
    })
  }

  return {
    isPending,
    onDelete,
  }
}
export default useDeleteCandidateNote
