import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { DeleteCandidateInput } from 'features/candidates/domain/interfaces'
import {
  schemaDelete,
  FormDataSchemaDelete,
} from '../../providers/constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'

interface deleteCandidateProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (value: any) => void
}

function useDeleteCandidate(
  props: deleteCandidateProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

  const { deleteCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
    DeleteCandidateInput,
    FormDataSchemaDelete
  >({
    mutationKey: [queryKey],
    queryString: deleteCandidate,
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schemaDelete),
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

export default useDeleteCandidate
