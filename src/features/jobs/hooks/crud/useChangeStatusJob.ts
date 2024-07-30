import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { UpdateHiringJobStatus } from 'features/jobs/domain/interfaces'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useUpdateResourceOther } from 'shared/hooks/crud-hook'
import { JobStatus } from 'shared/class/job-status'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import HiringJob from 'shared/schema/database/hiring_job'

const { STATUS_HIRING_JOB } = JobStatus

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
}

function useChangeStatusJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const queryClient = useQueryClient()
  const { changeStatusJob, queryKey, getJobDetail } = useGraphql()
  const { useEditReturn, useFormReturn, formData } = useUpdateResourceOther<
    HiringJob,
    FormDataSchemaChangeStatus,
    UpdateHiringJobStatus
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: changeStatusJob,
    oneBuildQuery: getJobDetail,
    queryKey: [queryKey],
    id,
    onSuccess: (data) => {
      onSuccess?.(data)
      queryClient.invalidateQueries({
        queryKey: [MODLUE_QUERY_KEY.GROUP_CANDIDATE_STATUS],
      })
    },
    formatDefaultValues(data) {
      return {
        note: '',
        status:
          data?.status === STATUS_HIRING_JOB.OPENED
            ? STATUS_HIRING_JOB.CLOSED
            : STATUS_HIRING_JOB.OPENED,
      }
    },
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      mutate({
        note: value?.note ?? '',
        status: value?.status,
        id: id,
      })
    })()
  }

  function renderTitle() {
    if (!formData?.status) return ''
    return formData?.status === STATUS_HIRING_JOB.OPENED
      ? 'Do you want to close this job?'
      : 'Do you want to reopen this job?'
  }

  return {
    control,
    isValid,
    isPending,
    action: {
      onSubmit,
      renderTitle,
    },
  }
}

export default useChangeStatusJob
