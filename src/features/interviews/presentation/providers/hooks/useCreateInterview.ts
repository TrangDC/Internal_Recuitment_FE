import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { NewCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { cloneDeep, isEmpty } from 'lodash'
import useCreateResource from 'shared/hooks/useCreateResource'
import { convertToUTC } from 'shared/utils/date'

interface createInterviewProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
  listQueryKey?: string[]
}

function useCreateInterview(
  props: createInterviewProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess, listQueryKey = [] } = props

  const { createCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateInterviewInput,
    FormDataSchema
  >({
    mutationKey: !isEmpty(listQueryKey) ? listQueryKey: [queryKey],
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
        interview_date: convertToUTC(value.interview_date).toISOString(),
        start_from:  convertToUTC(value.start_from).toISOString(),
        end_at: convertToUTC(value.end_at).toISOString()
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
