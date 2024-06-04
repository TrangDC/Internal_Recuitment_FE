import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { Job, UpdateJobStatus } from 'features/jobs/domain/interfaces'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../providers/constants/schema'
import useUpdateResourceOther from 'shared/hooks/crud-hook/useUpdateResourceOther'
import { BaseRecord } from 'shared/interfaces'
import { STATUS_STATE } from 'shared/constants/constants'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useCloseJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props

  const { changeStatusJob, queryKey, getJobDetail } = useGraphql()
  const { useEditReturn, useFormReturn, formData } = useUpdateResourceOther<
    Job,
    FormDataSchemaChangeStatus,
    UpdateJobStatus
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: changeStatusJob,
    oneBuildQuery: getJobDetail,
    queryKey: [queryKey],
    id,
    onSuccess,
    formatDefaultValues(data) {
      return {
        note: '',
        status:
          data?.status === STATUS_STATE.OPENED
            ? STATUS_STATE.CLOSED
            : STATUS_STATE.OPENED,
      }
    },
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate(value as UpdateJobStatus)
    })()
  }

  function renderTitle() {
    if(!formData?.status) return '';
    return formData?.status === STATUS_STATE.OPENED ? "Do you want to close this job?" : "Do you want to reopen this job?"
  }

  return {
    control,
    isValid,
    isPending,
    action: {
      onSubmit,
      renderTitle,
    }
  }
}

export default useCloseJob
