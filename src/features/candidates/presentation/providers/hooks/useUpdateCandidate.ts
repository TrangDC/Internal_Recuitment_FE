import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import {
  UpdateCandidateInput,
} from 'features/candidates/domain/interfaces'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateCandidate(
  props: createCandidateProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

  const { updateCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
  UpdateCandidateInput,
    FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateCandidate,
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schemaUpdate),
    onSuccess: callbackSuccess,
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
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
    setValue,
  }
}

export default useUpdateCandidate
