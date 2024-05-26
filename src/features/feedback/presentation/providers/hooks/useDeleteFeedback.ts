import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/feedback/domain/graphql/graphql'
import { DeleteFeedbackInput } from 'features/feedback/domain/interfaces'
import { schemaDelete, FormDataSchemaDelete } from '../constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'
import { isEmpty } from 'lodash'

interface deleteTeamProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (data: any) => void
  callbackError?: (data: any) => void
  listQueryKey?: string[]
}

function useDeleteFeedback(props: deleteTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError, listQueryKey = [] } = props

  const { deleteCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
    DeleteFeedbackInput,
    FormDataSchemaDelete
  >({
    mutationKey: !isEmpty(listQueryKey) ? listQueryKey: [queryKey],
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
