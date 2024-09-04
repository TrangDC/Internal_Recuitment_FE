import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useUpdateResourceOther } from 'shared/hooks/crud-hook'
import { useQueryClient } from '@tanstack/react-query'
import { MODLUE_QUERY_KEY } from 'shared/interfaces/common'
import HiringJob, {
  HiringJobStatus,
  UpdateHiringJobStatusArguments,
} from 'shared/schema/database/hiring_job'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  defaultValue?: Partial<FormDataSchemaChangeStatus>
}

function useReopenJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const queryClient = useQueryClient()
  const { reopenHiringJob, queryKey, getJobDetail } = useGraphql()
  const { useEditReturn, useFormReturn } = useUpdateResourceOther<
    HiringJob,
    FormDataSchemaChangeStatus,
    UpdateHiringJobStatusArguments
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: reopenHiringJob,
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
        status: data?.status ?? '',
        ...props.defaultValue,
      }
    },
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

  function onSubmit() {
    handleSubmit((value) => {
      const payload: UpdateHiringJobStatusArguments = {
        id,
        note: value?.note ?? '',
        status: value?.status as HiringJobStatus,
      }
      mutate(payload)
    })()
  }

  return {
    control,
    isValid,
    isPending,
    action: {
      onSubmit,
    },
  }
}

export default useReopenJob
