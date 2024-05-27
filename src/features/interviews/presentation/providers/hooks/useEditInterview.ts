import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { UpdateCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import { cloneDeep } from 'lodash'
import useUpdateResource from 'shared/hooks/useUpdateResource'
import { convertToUTC } from 'shared/utils/date'

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

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const valueClone = {
        ...cloneDeep(value),
        interview_date: convertToUTC(value.interview_date).toISOString(),
        start_from: convertToUTC(value.start_from).toISOString(),
        end_at: convertToUTC(value.end_at).toISOString(),
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

export default useEditInterview
