import useGraphql from 'features/calendars/domain/graphql'
import useCreateResource from 'shared/hooks/crud-hook/useCreateResource'
import {
  CreateInterviewFrom,
  CreateInterviewSchema,
} from '../constants/validate'
import { NewInterviewInput } from 'features/calendars/domain/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { BaseRecord } from 'shared/interfaces/common'
import {
  convertToRootByTimeNow,
  convertToRootDate,
} from '../../page-sections/google-calendar/functions'
import { convertToUTC, getLocalTimeOffset } from 'shared/utils/date'

interface IUseCreateInterview {
  onSuccess: (data: BaseRecord) => void
}

function useCreateInterview(props: IUseCreateInterview) {
  const { onSuccess } = props
  const today = new Date()
  const { createCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewInterviewInput,
    CreateInterviewFrom
  >({
    mutationKey: [queryKey],
    queryString: createCandidateInterview,
    defaultValues: {
      title: '',
      description: '',
      candidateId: '',
      interviewer: [],
      jobId: '',
      teamId: '',
      date: today,
    },
    resolver: yupResolver(CreateInterviewSchema),
    onSuccess,
  })

  const {
    handleSubmit,
    control,
    formState,
    trigger,
    watch,
    resetField,
    getValues,
    setValue,
  } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (value.from && value.to) {
        const { newEnd, newStart } = convertToRootDate(
          value.from,
          value.to,
          value.date
        )
        const interview_date = convertToUTC(value.date)
          .startOf('day')
          .subtract(getLocalTimeOffset(), 'hour')
          .toISOString()
        const formatStart = convertToUTC(newStart).toDate().toISOString()
        const formatEnd = convertToUTC(newEnd).toDate().toISOString()
        const formData: NewInterviewInput = {
          candidate_id: [value.candidateId],
          description: value.description ?? '',
          interviewer: value.interviewer ?? [],
          interview_date: interview_date,
          start_from: formatStart,
          end_at: formatEnd,
          title: value.title,
          job_id: value.jobId,
        }
        mutate(formData)
      }
    })()
  }

  function onSelectedInterviewDate() {
    const from = getValues('from')
    const to = getValues('to')
    const date = getValues('date')

    if (from) {
      const fromDate = convertToRootByTimeNow(from, date)
      setValue('from', fromDate.toDate(), { shouldValidate: true })
      trigger(['from'])
    }

    if (to) {
      const toDate = convertToRootByTimeNow(to, date)
      setValue('to', toDate.toDate(), { shouldValidate: true })
      trigger(['to'])
    }
  }

  function onSelectedTo(value?: Date) {
    const date = getValues('date')
    if (value) {
      const fromDate = convertToRootByTimeNow(value, date)
      setValue('to', fromDate.toDate(), { shouldValidate: true })
      trigger('from')
    }
  }

  function onSelectedFrom(value?: Date) {
    const date = getValues('date')
    if (value) {
      const fromDate = convertToRootByTimeNow(value, date)
      setValue('from', fromDate.toDate(), { shouldValidate: true })
    }
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      onSelectedInterviewDate,
      onSelectedTo,
      onSelectedFrom,
    },
    watch,
    resetField,
    formState,
    trigger,
  }
}
export default useCreateInterview
