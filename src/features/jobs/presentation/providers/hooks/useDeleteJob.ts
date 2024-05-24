import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { DeleteJobInput } from 'features/jobs/domain/interfaces'
import {
  schemaDelete,
  FormDataSchemaDelete,
} from '../../providers/constants/schema'
import useDeleteResource from 'shared/hooks/useDeleteResource'

interface deleteJobProps {
  defaultValues?: Partial<FormDataSchemaDelete>
  callbackSuccess?: (value: any) => void
  callbackError?: (data: any) => void
}

function useDeleteJob(props: deleteJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess, callbackError } = props

  const { deleteJob, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useDeleteResource<
  DeleteJobInput,
    FormDataSchemaDelete
  >({
    mutationKey: [queryKey],
    queryString: deleteJob,
    defaultValues: {
      note: '',
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

export default useDeleteJob
