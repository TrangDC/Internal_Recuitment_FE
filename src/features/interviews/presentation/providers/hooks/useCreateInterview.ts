import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { NewCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { cloneDeep } from 'lodash'
import useCreateResource from 'shared/hooks/crud-hook/useCreateResource'
import { convertToUTC, getLocalTimeOffset } from 'shared/utils/date'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'
import dayjs from 'dayjs'

interface createInterviewProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateInterview(
  props: createInterviewProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess} = props

  const { createCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateInterviewInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateInterview,
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue, watch, trigger } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      let interview_date = dayjs(value.interview_date);
      const start_form = dayjs(value.start_from).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());
      const end_at = dayjs(value.end_at).year(interview_date.year()).month(interview_date.month()).date(interview_date.date());

      const interview_date_apply = convertToUTC(value.interview_date)
      .startOf('day')
      .subtract(getLocalTimeOffset(), 'hour')
      .toISOString()

      const valueClone = {
        ...cloneDeep(value),
        interview_date: interview_date_apply,
        start_from:  convertToUTC(start_form.toDate()).toISOString(),
        end_at: convertToUTC(end_at.toDate()).toISOString()
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
    trigger,
  }
}

export default useCreateInterview
