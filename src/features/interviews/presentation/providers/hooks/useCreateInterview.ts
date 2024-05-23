import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { NewCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { cloneDeep } from 'lodash'
import { convertDateToISOString } from 'shared/utils/utils'
import useCreateResource from 'shared/hooks/useCreateResource'

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
      ...defaultValues,
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const valueClone = {
        ...cloneDeep(value),
        interview_date: convertDateToISOString(value.interview_date.toString()),
        start_from: convertDateToISOString(value.start_from.toString()),
        end_at: convertDateToISOString(value.end_at.toString()),
      }

      mutate(valueClone)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}

export default useCreateInterview
