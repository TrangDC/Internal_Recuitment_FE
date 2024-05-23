import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { UpdateCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface updateFeedbackProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateFeedback(props: updateFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { updateCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
    UpdateCandidateJobFeedbackInput,
    FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateCandidateJobFeedback,
    defaultValues: {
      feedback: '',
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
      mutate(value)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending,
  }
}

export default useUpdateFeedback
