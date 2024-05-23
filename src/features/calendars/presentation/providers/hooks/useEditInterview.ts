import useGraphql from 'features/calendars/domain/graphql'
import { EditInterviewFrom, EditInterviewSchema } from '../constants/validate'
import {
  CandidateInterview,
  UpdateCandidateInterviewInput,
} from 'features/calendars/domain/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'
import useEditResource from 'shared/hooks/useEditResource/useEditResource'
import { BaseRecord } from 'shared/interfaces/common'
import { convertFromUTC, convertToUTC } from 'shared/utils/date'
import { convertToRootDate } from '../../page-sections/google-calendar/functions'

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
      const start_from = convertFromUTC(new Date(data.start_from)).toDate()
      const end_at = convertFromUTC(new Date(data.end_at)).toDate()
      const interview_date = convertFromUTC(
        new Date(data.interview_date)
      ).toDate()
      return {
        description: data.description,
        candidateId: data.candidate_job.candidate_id,
        date: interview_date,
        from: start_from,
        jobId: data.candidate_job.hiring_job_id,
        teamId: data.candidate_job.hiring_job.team.id,
        title: data.title,
        to: end_at,
        interviewer: data.interviewer.map((o) => o.id),
        candidate_job_id: data.candidate_job_id,
      }
    },
  })

  const { handleSubmit, control, formState, setValue, watch, resetField } =
    useFormReturn
  const isValid = !formState.isDirty || !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
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
    })()
  }

  function onSeletedTeam(id: string | null) {
    setValue('teamId', id ?? '')
  }

  function onSeletedJob(id: string | null) {
    setValue('jobId', id ?? '')
    resetField('candidateId')
  }

  function handleGenerateToDate(value: ChosenDateType) {
    if (value) {
      const timeSteps = 30
      const toDate = value.add(timeSteps, 'minute')
      setValue('to', toDate.toDate())
    }
  }
  return {
    control,
    isValid,
    isPending,
    actions: { onSeletedTeam, onSeletedJob, onSubmit, handleGenerateToDate },
    watch,
    resetField,
  }
}
export default useEditInterview
