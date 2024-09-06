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
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import { t } from 'i18next'

type UseChangeStatusProps = {
  id: string
  onSuccess: (data: BaseRecord) => void
  defaultValue?: Partial<FormDataSchemaChangeStatus>
}

function useCancelJob(props: UseChangeStatusProps) {
  const { id, onSuccess } = props
  const {handleFailed, handleSuccess} = usePopup();
  const queryClient = useQueryClient()
  const { cancelHiringJob, queryKey, getJobDetail } = useGraphql()
  const { useEditReturn, useFormReturn } = useUpdateResourceOther<
    HiringJob,
    FormDataSchemaChangeStatus,
    UpdateHiringJobStatusArguments
  >({
    resolver: yupResolver(schemaChangeStatus),
    editBuildQuery: cancelHiringJob,
    oneBuildQuery: getJobDetail,
    queryKey: [queryKey],
    id,
    onError: (data) => {
      handleFailed({
        title: "Failed to cancel request",
        content: t(data?.message) ?? ''
      })
    },
    onSuccess: (data) => {
      onSuccess?.(data)
      queryClient.invalidateQueries({
        queryKey: [MODLUE_QUERY_KEY.GROUP_CANDIDATE_STATUS],
      })

      handleSuccess({
        title: "Cancel successfully",
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

export default useCancelJob
