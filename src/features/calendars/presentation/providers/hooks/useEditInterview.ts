import useGraphql from 'features/calendars/domain/graphql'
import { EditInterviewFrom, EditInterviewSchema } from '../constants/validate'
import {
  CandidateInterview,
  UpdateCandidateInterviewInput,
} from 'features/calendars/domain/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import useEditResource from 'shared/hooks/useEditResource/useEditResource'
import { BaseRecord } from 'shared/interfaces/common'
import { convertToUTC } from 'shared/utils/date'
import {
  convertToRootByTimeNow,
  convertToRootDate,
  formatStringToDate,
} from '../../page-sections/google-calendar/functions'
type UseEditInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditInterview(props: UseEditInterviewProps) {
  const { id, onSuccess } = props
  const { updateCandidateInterview, getCandidateInterview, queryKey } =
    useGraphql()
  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateInterview,
    EditInterviewFrom,
    UpdateCandidateInterviewInput
  >({
    resolver: yupResolver(EditInterviewSchema),
    editBuildQuery: updateCandidateInterview,
    oneBuildQuery: getCandidateInterview,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const { currentDate, newEnd, newStart } = formatStringToDate(
        data.start_from,
        data.end_at,
        data.interview_date
      )
      return {
        description: data.description,
        candidateId: data.candidate_job.candidate_id,
        date: currentDate,
        from: newStart,
        jobId: data.candidate_job.hiring_job_id,
        teamId: data.candidate_job.hiring_job.team.id,
        title: data.title,
        to: newEnd,
        interviewer: data.interviewer.map((o) => o.id),
        candidate_job_id: data.candidate_job_id,
      }
    },
  })

  const {
    handleSubmit,
    control,
    formState,
    watch,
    resetField,
    getValues,
    trigger,
    setValue,
  } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

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
        const formData: UpdateCandidateInterviewInput = {
          description: value.description ?? '',
          interviewer: value.interviewer ?? [],
          interview_date: interview_date,
          start_from: formatStart,
          end_at: formatEnd,
          title: value.title,
          candidate_job_id: value.candidate_job_id,
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
    }

    if (to) {
      const toDate = convertToRootByTimeNow(to, date)
      setValue('to', toDate.toDate(), { shouldValidate: true })
    }
    trigger(['from', 'to'])
  }

  function onSelectedTo(value?: Date) {
    const date = getValues('date')
    if (value) {
      const fromDate = convertToRootByTimeNow(value, date)
      setValue('to', fromDate.toDate(), { shouldValidate: true })
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
  }
}
export default useEditInterview
