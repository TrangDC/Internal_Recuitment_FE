import { yupResolver } from '@hookform/resolvers/yup'
import { removeStatusAttachment } from 'shared/utils/utils'
import {
  EditHistoryCallSchema,
  FormDataSchemaEditHistoryCall,
} from 'features/candidates/shared/constants/historyCallSchema'
import dayjs from 'dayjs'
import {
  CandidateHistoryCall,
  CandidateHistoryCallTypeEnum,
  UpdateCandidateHistoryCallArguments,
} from 'shared/schema/database/candidate_history_calls'
import useEditResource from 'shared/hooks/crud-hook/useUpdateResourceOther'
import useCandidateHistoryCallGraphql from 'features/candidates/domain/graphql/candidateHistoryCall'
import {
  convertToRootDate,
  convertToUTC,
  getLocalTimeOffset,
} from 'shared/utils/date'

type UseCreateNoteProps = {
  successCallback: () => void
  id: string
}

function useEditHistoryCall({ successCallback, id }: UseCreateNoteProps) {
  const { getCandidateHistoryCall, updateCandidateHistoryCall, queryKey } =
    useCandidateHistoryCallGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    CandidateHistoryCall,
    FormDataSchemaEditHistoryCall,
    UpdateCandidateHistoryCallArguments
  >({
    id: id,
    editBuildQuery: updateCandidateHistoryCall,
    oneBuildQuery: getCandidateHistoryCall,
    queryKey: [queryKey],
    formatDefaultValues: (data) => {
      return {
        name: data?.name ?? '',
        attachments: data?.attachments || [],
        description: data?.description ?? '',
        contactDate: data?.date ? dayjs(data?.date).toDate() : null,
        timeFrom: data?.start_time ? dayjs(data?.start_time).toDate() : null,
        contactTo: data?.contact_to ?? '',
        contactType: data?.type ?? '',
        timeTo: data?.end_time ? dayjs(data?.end_time).toDate() : null,
      }
    },
    resolver: yupResolver(EditHistoryCallSchema),
    onSuccess(data) {
      successCallback()
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
  const { isPending, mutate } = useEditReturn

  function onSubmit(note: string) {
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
        const payload: UpdateCandidateHistoryCallArguments = {
          id: id,
          input: {
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
            attachments: attachments,
          },
          note: note,
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
    useEditReturn,
    useFormReturn,
    setValue,
    isGetting,
    onSelectedInterviewDate,
    onSelectedTo,
    onSelectedFrom,
  }
}

export default useEditHistoryCall
