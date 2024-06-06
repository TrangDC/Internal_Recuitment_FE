import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { Hiring, HiringInput } from 'features/hiring/domain/interfaces'
import { schemaUpdate, FormDataSchemaUpdate } from '../constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useEditHiring(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const { updateUser, getUser, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Hiring,
    FormDataSchemaUpdate,
    HiringInput
  >({
    resolver: yupResolver(schemaUpdate),
    editBuildQuery: updateUser,
    oneBuildQuery: getUser,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
 
      return {
        status: data.status,
        name: data.name,
        work_email: data.work_email,
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as HiringInput)
    })()
  }

  const callbackSubmit = (reason: string) => {
    setValue('note', reason)
    onSubmit()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
      callbackSubmit
    },
    formState,
    setValue,
    isGetting
  }
}

export default useEditHiring
