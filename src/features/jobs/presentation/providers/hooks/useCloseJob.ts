import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { UpdateJobStatus } from 'features/jobs/domain/interfaces'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../providers/constants/schema'
import useUpdateResourceOther from 'shared/hooks/useUpdateResourceOther'

interface closeJobProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
  callbackError?: (data: any) => void
}

function useCloseJob(props: closeJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError } = props

  const { changeStatusJob, queryKey } = useGraphql()
  const { useUpdateReturn, useFormReturn } = useUpdateResourceOther<
    UpdateJobStatus,
    FormDataSchemaChangeStatus
  >({
    mutationKey: [queryKey],
    queryString: changeStatusJob,
    defaultValues: {
      note: '',
      status: 'closed',
      ...defaultValues,
    },
    resolver: yupResolver(schemaChangeStatus),
    onSuccess: callbackSuccess,
    onError: callbackError,
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useUpdateReturn

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

export default useCloseJob
