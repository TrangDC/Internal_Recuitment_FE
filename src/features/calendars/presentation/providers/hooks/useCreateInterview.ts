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
    setValue,
    watch,
    resetField,
    getValues,
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

  console.log('formState', formState)
  return {
    control,
    isValid,
    isPending,
    actions: { onSubmit },
    watch,
    resetField,
    formState,
  }
}
export default useCreateInterview
