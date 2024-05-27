import useGraphql from 'features/calendars/domain/graphql'
import useCreateResource from 'shared/hooks/useCreateResource'
import {
  CreateInterviewFrom,
  CreateInterviewSchema,
} from '../constants/validate'
import { NewInterviewInput } from 'features/calendars/domain/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'
import { BaseRecord } from 'shared/interfaces/common'
import {
  convertToRootByTimeNow,
  convertToRootDate,
} from '../../page-sections/google-calendar/functions'
import { convertToUTC } from 'shared/utils/date'
import dayjs from 'dayjs'

interface IUseCreateInterview {
  onSuccess: (data: BaseRecord) => void
}

function useCreateInterview(props: IUseCreateInterview) {
  const { onSuccess } = props
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
    },
    resolver: yupResolver(CreateInterviewSchema),
    onSuccess,
  })

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    watch,
    resetField,
    getValues,
  } = useFormReturn
  const isValid = !formState.isDirty || !formState.isValid
  const { mutate, isPending } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (value.from && value.to) {
        const { newEnd, newStart } = convertToRootDate(
          value.from,
          value.to,
          value.date
        )
        const interview_date = convertToUTC(value.date).toDate().toISOString()
        const formatStart = convertToUTC(newStart).toISOString()
        const formatEnd = convertToUTC(newEnd).toISOString()
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

  function handleGenerateToDate(from: ChosenDateType) {
    if (from) {
      const endOfDay = from.endOf('day')
      let to = from.add(30, 'minute')
      if (to.isAfter(endOfDay)) {
        return endOfDay.toDate()
      }
      return to.toDate()
    }
  }

  function onFromChange(
    from: ChosenDateType,
    onChange: (...event: any[]) => void
  ) {
    if (from) {
      onChange(from.toDate())
      const to = handleGenerateToDate(from)
      if (to) setValue('to', to)
    } else {
      onChange(undefined)
    }
  }

  function onInterviewDateChange(interviewDate: ChosenDateType) {
    if (interviewDate) {
      const from = convertToRootByTimeNow(
        dayjs().toDate(),
        interviewDate.toDate()
      )
      setValue('from', from.toDate())
      const to = handleGenerateToDate(from)
      if (to) setValue('to', to)
    } else {
      resetField('from')
      resetField('to')
    }
  }

  function onToChange(
    value: ChosenDateType,
    onChange: (...event: any[]) => void
  ) {
    if (value) {
      const to = convertToRootByTimeNow(
        value.toDate(),
        dayjs(getValues('date')).toDate()
      )
      onChange(to.toDate())
    } else {
      onChange(undefined)
    }
  }

  return {
    control,
    isValid,
    isPending,
    actions: { onSubmit, onInterviewDateChange, onToChange, onFromChange },
    watch,
    resetField,
    formState,
  }
}
export default useCreateInterview
