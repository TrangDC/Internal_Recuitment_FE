import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/interviews/domain/graphql/graphql'
import { DeleteInterviewInput } from 'features/interviews/domain/interfaces'
import { schemaDelete, FormDataSchemaDelete } from '../constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'
import { isEmpty } from 'lodash'

interface deleteTeamProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (data: any) => void
  callbackError?: (data: any) => void
  listQueryKey?: string[]
}

function useDeleteInterview(props: deleteTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError, listQueryKey = []  } = props

  const { deleteCandidateInterview, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
    DeleteInterviewInput,
    FormDataSchemaDelete
  >({
    mutationKey:  !isEmpty(listQueryKey) ? listQueryKey: [queryKey],
    queryString: deleteCandidateInterview,
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

export default useDeleteInterview
