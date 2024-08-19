import { yupResolver } from '@hookform/resolvers/yup'
import { useEditResource } from 'shared/hooks/crud-hook'
import {
  CreateNote,
  FormDataSchemaEditNote,
} from 'features/candidates/shared/constants/noteSchema'
import CandidateNote, {
  UpdateCandidateNoteArguments,
} from 'shared/schema/database/candidate_note'
import { removeStatusAttachment } from 'shared/utils/utils'
import useCandidateNoteGraphql from 'features/candidates/domain/graphql/candidateNote'

type UseEditNoteProps = {
  successCallback: () => void
  id: string
}

function useEditNote({ successCallback, id }: UseEditNoteProps) {
  const { getCandidateNote, queryKey, updateCandidateNote } = useCandidateNoteGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    CandidateNote,
    FormDataSchemaEditNote,
    UpdateCandidateNoteArguments
  >({
    id: id,
    queryKey: [queryKey],
    editBuildQuery: updateCandidateNote,
    oneBuildQuery: getCandidateNote,
    formatDefaultValues: (data) => {
      return {
        name: data?.name ?? '',
        attachments: data?.attachments || [],
        description: data?.description || '',
      }
    },
    resolver: yupResolver(CreateNote),
    onSuccess(data) {
      successCallback()
    },
  })

  const { handleSubmit, control, formState, watch, getValues } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
    handleSubmit((value) => {
      if (id) {
        const attachments = removeStatusAttachment(value?.attachments)
        const payload: UpdateCandidateNoteArguments = {
          input: {
            attachments: attachments,
            description: value.description,
            name: value.name,
          },
          id: id,
          note: note,
        }
        mutate(payload)
      }
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    formState,
    watch,
    getValues,
    useEditReturn,
    useFormReturn,
    isGetting,
  }
}

export default useEditNote
