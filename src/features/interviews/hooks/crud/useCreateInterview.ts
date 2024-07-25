import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { NewCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schema, FormDataSchema } from '../../shared/constants/schema'
import { cloneDeep } from 'lodash'
import { convertToUTC, getLocalTimeOffset } from 'shared/utils/date'
import { ChosenDateType } from 'shared/components/input-fields/AppTimePicker'
import dayjs from 'dayjs'
import { useCreateResource } from 'shared/hooks/crud-hook'

interface createInterviewProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateInterview(
  props: createInterviewProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

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
      location: '',
      meeting_link: '',
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue, watch, trigger } =
    useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      if(!value.interview_date) return
      let interview_date = dayjs(value.interview_date)
      const start_form = dayjs(value.start_from)
        .year(interview_date.year())
        .month(interview_date.month())
        .date(interview_date.date())
      const end_at = dayjs(value.end_at)
        .year(interview_date.year())
        .month(interview_date.month())
        .date(interview_date.date())

      const interview_date_apply = convertToUTC(value.interview_date)
        .startOf('day')
        .subtract(getLocalTimeOffset(), 'hour')
        .toISOString()

      const valueClone = {
        ...cloneDeep(value),
        interview_date: interview_date_apply,
        start_from: convertToUTC(start_form.toDate()).toISOString(),
        end_at: convertToUTC(end_at.toDate()).toISOString(),
      }

      mutate(valueClone)
    })()
  }

  function handleGenerateToDate(value: ChosenDateType) {
    if (value) {
      let to = value.add(30, 'minute')
      const endOfDay = dayjs().endOf('day')
      if (to.isAfter(endOfDay)) {
        to = endOfDay
      }
      setValue('end_at', to.toDate())
    }
  }

  function resetMeetingLink () {
    setValue('meeting_link', '')
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
    formState,
    resetMeetingLink,
  }
}

export default useCreateInterview
