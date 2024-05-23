import { yupResolver } from '@hookform/resolvers/yup'
import { useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../constants/schema'
import { UpdateCandidateJobStatus } from 'features/candidates/domain/interfaces'
import { cloneDeep } from 'lodash'
import { removeInfoData } from 'shared/utils/utils'
import useCreateResource from 'shared/hooks/useCreateResource'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import {
  FormDataSchema,
  schema,
} from 'features/feedback/presentation/providers/constants/schema'
import useUpdateResourceOther from 'shared/hooks/useUpdateResourceOther'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
}

interface propsChangeStatus {
  mutationFeedback: (data: any) => void
  callbackSuccess?: (value: any) => void
}

function ChangeStatus(props: propsChangeStatus) {
  const { callbackSuccess, mutationFeedback } = props
  const queryClient = useQueryClient()
  const { changeStatusCandidate, queryKey } = useGraphql()
  const { useUpdateReturn, useFormReturn } = useUpdateResourceOther<
    UpdateCandidateJobStatus,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: changeStatusCandidate,
    defaultValues: {
      feedback: ''
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })

  const { formState, watch } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useUpdateReturn


  return {
    mutateChangeStatus: mutate,
    isPendingStatus: isPending,
    isValidStatus: isValid,
  }
}

function CreateFeedbackprops(
  props: Pick<useChangeStatusProps, 'callbackSuccess'> = {}
) {
  const { callbackSuccess } = props

  const { createCandidateJobFeedback, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useCreateResource<
    NewCandidateJobFeedbackInput,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: createCandidateJobFeedback,
    defaultValues: {
      feedback: '',
    },
    resolver: yupResolver(schema),
    onSuccess: callbackSuccess,
  })


  const { formState } = useFormReturn
  const isValid = !formState.isValid
  const { mutate } = useCreateReturn

  return {
    mutateCreateFeedback: mutate,
    isValidFeedback: isValid,
  }
}

function useChangeStatus(props: useChangeStatusProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props
  const { mutateCreateFeedback } = CreateFeedbackprops({ callbackSuccess })
  const { mutateChangeStatus, isPendingStatus } = ChangeStatus({
    callbackSuccess,
    mutationFeedback: (data: UpdateCandidateJobStatus) => {
      const valueClone = { ...cloneDeep(data), candidate_job_id: data.id }
      mutateCreateFeedback(
        removeInfoData({ field: ['status', 'id'], object: valueClone })
      )
    },
  })

  const { handleSubmit, formState, control, watch } =
    useForm<FormDataSchemaChangeStatus>({
      resolver: yupResolver(schemaChangeStatus),
      defaultValues: {
        ...defaultValues,
      },
    })

  const isValid = !formState.isValid

  function onSubmit() {
    handleSubmit((value) => {
      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ...cloneDeep(value),
        },
      })

      mutateChangeStatus(valueClone as UpdateCandidateJobStatus)
    })()
  }

  return {
    onSubmit,
    control,
    isValid,
    isPending: isPendingStatus,
    watch,
  }
}

export default useChangeStatus
