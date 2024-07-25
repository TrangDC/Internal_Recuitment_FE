import useGraphql from 'features/calendars/domain/graphql'
import {
  CandidateInterview,
  UpdateCandidateInterviewInput,
} from 'features/calendars/domain/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { BaseRecord } from 'shared/interfaces/common'
import { convertToUTC, getLocalTimeOffset } from 'shared/utils/date'

import { useEditResource } from 'shared/hooks/crud-hook'
import {
  EditInterviewFrom,
  EditInterviewSchema,
} from '../shared/constants/validate'
import {
  convertToRootByTimeNow,
  convertToRootDate,
  formatStringToDate,
} from '../presentation/page-sections/google-calendar/functions'

type UseEditInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditInterview(props: UseEditInterviewProps) {
  const { id, onSuccess } = props
  const { updateCandidateInterview, getCandidateInterview, queryKey } =
    useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
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
        data?.start_from ?? new Date().toString(),
        data?.end_at ?? new Date().toString(),
        data?.interview_date ?? new Date().toString()
      )

      return {
        description: data?.description ?? '',
        candidateId: data?.candidate_job.candidate_id ?? '',
        date: currentDate,
        from: newStart,
        jobId: data?.candidate_job.hiring_job_id ?? '',
        teamId: data?.candidate_job.hiring_job.team.id ?? '',
        title: data?.title ?? '',
        to: newEnd,
        interviewer: data?.interviewer.map((o) => o.id),
        candidate_job_id: data?.candidate_job_id ?? '',
        location: data?.location ?? '',
        meeting_link: data?.meeting_link ?? ''
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
  const isValid = !formState.isValid || !formState.isDirty
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      if (value.from && value.to && value.date) {
        const { newEnd, newStart } = convertToRootDate(
          value.from,
          value.to,
          value.date
        )
        const interview_date = convertToUTC(value.date)
          .startOf('day')
          .subtract(getLocalTimeOffset(), 'hour')
          .toISOString()

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
          note: '',
          location: value.location,
          meeting_link: value.meeting_link ?? ''
        }
        mutate(formData)
      }
    })()
  }

  function onSelectedInterviewDate() {
    const from = getValues('from')
    const to = getValues('to')
    const date = getValues('date')
    if (from && date) {
      const fromDate = convertToRootByTimeNow(from, date)
      setValue('from', fromDate.toDate(), { shouldValidate: true })
    }

    if (to && date) {
      const toDate = convertToRootByTimeNow(to, date)
      setValue('to', toDate.toDate(), { shouldValidate: true })
    }
    trigger(['from', 'to'])
  }

  function onSelectedTo(value?: Date) {
    const date = getValues('date')
    if (value && date) {
      const fromDate = convertToRootByTimeNow(value, date)
      setValue('to', fromDate.toDate(), { shouldValidate: true, shouldDirty: true })
      trigger('from')
    }
  }

  function onSelectedFrom(value?: Date) {
    const date = getValues('date')
    if (value && date) {
      const fromDate = convertToRootByTimeNow(value, date)
      setValue('from', fromDate.toDate(), { shouldValidate: true, shouldDirty: true })
    }
  }

  function resetMeetingLink () {
    setValue('meeting_link', '')
  }

  return {
    control,
    isValid,
    isPending,
    isGetting,
    actions: {
      onSubmit,
      onSelectedInterviewDate,
      onSelectedTo,
      onSelectedFrom,
      resetMeetingLink
    },
    watch,
    resetField,
    formState,
    setValue
  }
}
export default useEditInterview
