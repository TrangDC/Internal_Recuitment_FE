import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useParams } from 'react-router-dom'
import {
  CreateHistoryCallSchema,
  FormDataSchemaCreateHistoryCall,
} from 'features/candidates/shared/constants/historyCallSchema'
import dayjs from 'dayjs'
import {
  CandidateHistoryCallTypeEnum,
  CreateCandidateHistoryCallArguments,
} from 'shared/schema/database/candidate_history_calls'
import useCandidateHistoryCall from 'features/candidates/domain/graphql/candidateHistoryCall'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'

type UseCreateNoteProps = {
  successCallback: () => void
}

function useCreateHistoryCall({ successCallback }: UseCreateNoteProps) {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { createCandidateHistoryCall, queryKey } = useCandidateHistoryCall()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    CreateCandidateHistoryCallArguments,
    FormDataSchemaCreateHistoryCall
  >({
    mutationKey: [queryKey],
    queryString: createCandidateHistoryCall,
    defaultValues: {
      name: '',
      attachments: [],
      description: '',
      contactDate: dayjs(),
      timeFrom: null,
      contactTo: '',
      contactType: '',
      timeTo: null,
    },
    resolver: yupResolver(CreateHistoryCallSchema),
    onSuccess(data) {
      successCallback()
      queryClient.invalidateQueries({
        queryKey: [MODLUE_QUERY_KEY.CANDIDATE_ACTIVITY],
      })
    },
  })

  const { handleSubmit, control, formState, watch, getValues, setValue } =
    useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (id && value?.contactDate) {
        const attachments = removeStatusAttachment(value?.attachments)
        const payload: CreateCandidateHistoryCallArguments = {
          input: {
            candidate_id: id,
            contact_to: value.contactTo ?? '',
            date: value?.contactDate?.toISOString(),
            description: value.description ?? '',
            end_time: value.timeTo?.toISOString() ?? null,
            name: value.name,
            start_time: value.timeFrom?.toISOString() ?? null,
            type: value.contactType as CandidateHistoryCallTypeEnum,
            attachments,
          },
          note: '',
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
    setValue,
  }
}

export default useCreateHistoryCall
