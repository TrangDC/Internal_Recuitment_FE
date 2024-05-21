import useGraphql from 'features/calendars/domain/graphql'
import useCreateResource from 'shared/hooks/useCreateResource'
import {
  CreateInterviewFrom,
  CreateInterviewSchema,
} from '../constants/validate'
import { NewIntefviewInput } from 'features/calendars/domain/graphql/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'

function useCreateInterview() {
  const { createCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewIntefviewInput,
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
  })

  const { handleSubmit, control, formState, setValue, watch, resetField } =
    useFormReturn
  const isValid = !formState.isDirty || !formState.isValid
  const { mutate, isPending } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const formData: NewIntefviewInput = {
        candidate_id: [value.candidateId],
        description: value.description ?? '',
        interviewer: value.interviewer ?? [],
        interview_date: value.date.toISOString(),
        start_from: value.from.toISOString(),
        end_at: value.to.toISOString(),
        title: value.title,
        job_id: value.jobId,
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
  }
}
export default useCreateInterview
