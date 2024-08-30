import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import {
  FormDataSchemaUpdateJobStatus,
  schemaUpdateStepStatus,
} from '../../shared/constants/schema'
import { BaseRecord } from 'shared/interfaces'
import { useCreateResource } from 'shared/hooks/crud-hook'
import {
  HiringJobStatusStep,
  UpdateHiringJobStepInputArguments,
} from 'shared/schema/database/hiring_job'

type UseChangeStatusProps = {
  onSuccess: (data: BaseRecord) => void
  defaultValue?: Partial<FormDataSchemaUpdateJobStatus>
}

function useChangeApprovals(props: UseChangeStatusProps) {
  const { onSuccess, defaultValue } = props
  const { updateBulkHiringJobStepsStatus, queryKey } = useGraphql()

  const { useCreateReturn, useFormReturn } = useCreateResource<
    UpdateHiringJobStepInputArguments,
    FormDataSchemaUpdateJobStatus
  >({
    mutationKey: [queryKey],
    queryString: updateBulkHiringJobStepsStatus,
    defaultValues: {
      hiring_job_ids: [],
      status: '',
      ...defaultValue,
    },
    resolver: yupResolver(schemaUpdateStepStatus),
    onSuccess: (data) => {
      onSuccess?.(data)
    },
  })

  const { handleSubmit, control, formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

  function onSubmit() {
    handleSubmit((value) => {
      const payload: UpdateHiringJobStepInputArguments = {
        hiring_job_ids: value?.hiring_job_ids,
        status: value?.status as HiringJobStatusStep,
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

export default useChangeApprovals
