import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import {
  schemaDelete,
  FormDataSchemaDelete,
} from '../../providers/constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'
import { DeleteCandidateJobInput } from 'features/candidatejob/domain/interfaces'

interface deleteTeamProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (data: any) => void
  callbackError?: (data: any) => void
}

function useDeleteCandidateJob(props: deleteTeamProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError } = props

  const { deleteCandidateJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
  DeleteCandidateJobInput,
    FormDataSchemaDelete
  >({
    mutationKey: [queryKey],
    queryString: deleteCandidateJob,
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

export default useDeleteCandidateJob
