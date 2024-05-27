import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import useCreateResource from 'shared/hooks/useCreateResource'

interface createFeedbackProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateFeedback(props: createFeedbackProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess
  } = props

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobFeedbackInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJobFeedback,
    defaultValues: {
      feedback: '',
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

export default useCreateFeedback
