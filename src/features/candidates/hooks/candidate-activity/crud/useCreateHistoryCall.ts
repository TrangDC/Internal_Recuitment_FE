import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateResource } from 'shared/hooks/crud-hook'
import { removeStatusAttachment } from 'shared/utils/utils'
import { useParams } from 'react-router-dom'
import {
  CreateHistoryCallSchema,
  FormDataSchemaCreateHistoryCall,
} from 'features/candidates/shared/constants/historyCallSchema'
import {
  CandidateHistoryCallTypeEnum,
  CreateCandidateHistoryCallArguments,
} from 'shared/schema/database/candidate_history_calls'
import useCandidateHistoryCall from 'features/candidates/domain/graphql/candidateHistoryCall'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import {
  convertToRootDate,
  convertToUTC,
  getLocalTimeOffset,
} from 'shared/utils/date'

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
      contactDate: null,
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

  const {
    handleSubmit,
    control,
    formState,
    watch,
    getValues,
    setValue,
    trigger,
  } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (id && value?.contactDate) {
        const endTime = value.timeTo
          ? convertToRootDate(value.timeTo, value.contactDate)
          : null
        const startTime = value.timeFrom
          ? convertToRootDate(value.timeFrom, value.contactDate)
          : null
        const contactDate = convertToUTC(value.contactDate)
          .startOf('day')
          .subtract(getLocalTimeOffset(), 'hour')
          .toISOString()
        const attachments = removeStatusAttachment(value?.attachments)
        const payload: CreateCandidateHistoryCallArguments = {
          input: {
            candidate_id: id,
            contact_to: value.contactTo ?? '',
            date: contactDate,
            description: value.description ?? '',
            end_time: endTime
              ? convertToUTC(endTime.toDate()).toDate().toISOString()
              : null,
            name: value.name,
            start_time: startTime
              ? convertToUTC(startTime.toDate()).toDate().toISOString()
              : null,
            type: value.contactType as CandidateHistoryCallTypeEnum,
            attachments,
          },
          note: '',
        }
        mutate(payload)
      }
    })()
  }

  function onSelectedInterviewDate() {
    const from = getValues('timeFrom')
    const to = getValues('timeTo')
    const date = getValues('contactDate')

    if (from && date) {
      const fromDate = convertToRootDate(from, date)
      setValue('timeFrom', fromDate.toDate(), { shouldValidate: true })
      trigger(['timeFrom'])
    }

    if (to && date) {
      const toDate = convertToRootDate(to, date)
      setValue('timeTo', toDate.toDate(), { shouldValidate: true })
      trigger(['timeTo'])
    }
  }

  function onSelectedTo(value?: Date) {
    const date = getValues('contactDate')
    if (value && date) {
      const fromDate = convertToRootDate(value, date)
      setValue('timeTo', fromDate.toDate(), { shouldValidate: true })
      trigger('timeFrom')
    }
  }

  function onSelectedFrom(value?: Date) {
    const date = getValues('contactDate')
    if (value && date) {
      const fromDate = convertToRootDate(value, date)
      setValue('timeFrom', fromDate.toDate(), { shouldValidate: true })
    }
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
    onSelectedInterviewDate,
    onSelectedTo,
    onSelectedFrom,
  }
}

export default useCreateHistoryCall
