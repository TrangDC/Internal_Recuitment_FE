import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { HiringInput } from 'features/hiring/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface EditHiringProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useEditHiring(props: EditHiringProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const { updateUser, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
  HiringInput,
    FormDataSchemaUpdate
  >({
    mutationKey: [queryKey],
    queryString: updateUser,
    defaultValues: {
      status: 'active',
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

export default useEditHiring
