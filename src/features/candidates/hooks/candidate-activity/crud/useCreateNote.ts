import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  CreateNote,
  FormDataSchemaCreateNote,
} from 'features/candidates/shared/constants/noteSchema'
import { CreateCandidateNoteArguments } from 'shared/schema/database/candidate_note'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useParams } from 'react-router-dom'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import { useQueryClient } from '@tanstack/react-query'
import useCandidateNoteGraphql from 'features/candidates/domain/graphql/candidateNote'

type UseCreateNoteProps = {
  successCallback: () => void
}

function useCreateNote({ successCallback }: UseCreateNoteProps) {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { createCandidateNote, queryKey } = useCandidateNoteGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateNoteArguments,
    FormDataSchemaCreateNote
  >({
    mutationKey: [queryKey],
    queryString: createCandidateNote,
    defaultValues: {
      name: '',
      attachments: [],
      description: '',
    },
    resolver: yupResolver(CreateNote),
    onSuccess(data) {
      successCallback()
      queryClient.invalidateQueries({
        queryKey: [MODLUE_QUERY_KEY.CANDIDATE_ACTIVITY],
      })
    },
  })

  const { handleSubmit, control, formState, watch, getValues } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (id) {
        const attachments = removeStatusAttachment(value?.attachments)
        const payload: CreateCandidateNoteArguments = {
          input: {
            attachments: attachments,
            candidate_id: id,
            description: value.description,
            name: value.name,
          },
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
    useCreateReturn,
    useFormReturn,
  }
}

export default useCreateNote
