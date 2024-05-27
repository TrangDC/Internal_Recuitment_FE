import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { DeleteFeedbackInput } from 'features/feedback/domain/interfaces'
import { schemaDelete, FormDataSchemaDelete } from '../constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'

interface deleteTeamProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (data: any) => void
  callbackError?: (data: any) => void
}

function useDeleteFeedback(props: deleteTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError} = props

  const { deleteCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
    DeleteFeedbackInput,
    FormDataSchemaDelete
  >({
    mutationKey: [queryKey],
    queryString: deleteCandidateJobFeedback,
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schemaDelete),
    onSuccess: callbackSuccess,
    onError: callbackError,
    showErrorMsg: false,
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

export default useDeleteFeedback
