import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { Interview, UpdateCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import { cloneDeep } from 'lodash'
import { convertToUTC, replaceYearWithCurrent } from 'shared/utils/date'
import dayjs from 'dayjs'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'
import { transformListItem } from 'shared/utils/utils'

type UseEditInterviewProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditInterview(props: UseEditInterviewProps) {
  const { id, onSuccess } = props
  const { updateCandidateInterview, getInterview, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Interview,
    FormDataSchemaUpdate,
    UpdateCandidateInterviewInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateCandidateInterview,
    oneBuildQuery: getInterview,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      const interviewers = transformListItem(data.interviewer, 'id');
      const start_form = new Date(replaceYearWithCurrent(data.start_from));
      const end_at = new Date(replaceYearWithCurrent(data.end_at))

      return {
        description: data.description,
        title: data.title,
        candidate_job_id: data.candidate_job.id,
        interview_date: new Date(data.interview_date),
        interviewer: interviewers,
        start_from: start_form,
        end_at: end_at,
        note: '',
      }
    },
  })

   const { handleSubmit, control, formState, setValue, watch, trigger } = useFormReturn
  const isValid = !formState.isValid

  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      let interview_date = dayjs(value.interview_date);
      const start_form = dayjs(value.start_from).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());
      const end_at = dayjs(value.end_at).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());

      const interview_date_apply = convertToUTC(value.interview_date).toISOString()
      const valueClone = {
        ...cloneDeep(value),
        interview_date: interview_date_apply,
        start_from: convertToUTC(start_form.toDate()).toISOString(),
        end_at: convertToUTC(end_at.toDate()).toISOString(),
      }

      //@ts-ignore
      mutate(valueClone) 
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      callbackSubmit
    },
    formState,
    setValue,
    isGetting,
    watch, 
    trigger
  }
}

export default useEditInterview

