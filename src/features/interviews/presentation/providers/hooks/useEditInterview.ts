import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { UpdateCandidateInterviewInput } from 'features/interviews/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import { cloneDeep } from 'lodash'
import { convertDateToISOString } from 'shared/utils/utils'
import useUpdateResource from 'shared/hooks/useUpdateResource'

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

export default useEditInterview
