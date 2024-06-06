import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/hiring/domain/graphql/graphql'
import { ChangeStatusUser, Hiring } from 'features/hiring/domain/interfaces'
import { schemaChangeStatus, FormDataSchemaUpdateStatus } from '../constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useEditResource } from 'shared/hooks/crud-hook'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useChangeStatus(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const { changeStatusUser, getUser, queryKey } = useGraphql()
  const { useEditReturn, useFormReturn, isGetting } = useEditResource<
    Hiring,
    FormDataSchemaUpdateStatus,
    ChangeStatusUser
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: changeStatusUser,
    oneBuildQuery: getUser,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
 
      return {
        status: data.status,
        note: '',
      }
    },
  })

  const { handleSubmit, control, formState, setValue } = useFormReturn
  const isValid = !formState.isValid
  const { mutate, isPending } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as ChangeStatusUser)
    })()
  }

  return {
    control,
    isValid,
    isPending,
    actions: {
      onSubmit,
    },
    formState,
    setValue,
    isGetting
  }
}

export default useChangeStatus
