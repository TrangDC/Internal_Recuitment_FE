import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { ChangeStatusUser } from 'features/hiring/domain/interfaces'
import { schemaChangeStatus, FormDataSchemaUpdateStatus } from '../constants/schema'
import _ from 'lodash'
import useUpdateResource from 'shared/hooks/useUpdateResource'

interface deleteHiringProps {
defaultValues?: Partial<FormDataSchemaUpdateStatus>
  callbackSuccess?: (value: any) => void
}

function useDeleteHiring(props: deleteHiringProps = { defaultValues: {}}) {
  const { defaultValues, callbackSuccess } = props
  const { changeStatusUser, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
  ChangeStatusUser,
    FormDataSchemaUpdateStatus
  >({
    mutationKey: [queryKey],
    queryString: changeStatusUser,
    defaultValues: {
      status: 'inactive',
      ...defaultValues,
    },
    resolver: yupResolver(schemaChangeStatus),
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

export default useDeleteHiring
