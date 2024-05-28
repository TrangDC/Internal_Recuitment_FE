import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { UpdateCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import { cloneDeep } from 'lodash'
import useUpdateResource from 'shared/hooks/useUpdateResource'
import { convertToUTC } from 'shared/utils/date'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'
import dayjs from 'dayjs'

interface updateInterview {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useEditInterview(
  props: updateInterview = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

  const { updateCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
  UpdateCandidateInterviewInput,
  FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateCandidateInterview,
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schemaUpdate),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue, watch, trigger } = useFormReturn
  const isValid = !formState.isDirty || !formState.isValid

  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const interview_date = dayjs(value.interview_date);
      const start_form = dayjs(value.start_from).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());
      const end_at = dayjs(value.end_at).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());
   
      const valueClone = {
        ...cloneDeep(value),
        interview_date: convertToUTC(value.interview_date).toISOString(),
        start_from: convertToUTC(start_form.toDate()).toISOString(),
        end_at: convertToUTC(end_at.toDate()).toISOString(),
      }

      mutate(valueClone)
    })()
  }

  function handleGenerateToDate(value: ChosenDateType) {
    if (value) {
      let  to = value.add(30, 'minute')
      const endOfDay = dayjs().endOf('day')
      if (to.isAfter(endOfDay)) {
        to = endOfDay
      }
      setValue('end_at', to.toDate());
    }
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
    handleGenerateToDate,
    setValue,
    watch,
    trigger
  }
}

export default useEditInterview
