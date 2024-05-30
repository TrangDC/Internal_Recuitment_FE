import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../constants/schema'
import { UpdateCandidateJobStatus } from 'features/candidates/domain/interfaces'
import { cloneDeep } from 'lodash'
import { getInfoData, removeInfoData, transformListArray } from 'shared/utils/utils'
import useCreateResource from 'shared/hooks/useCreateResource'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import {
  FormDataSchema,
  schema,
} from 'features/feedback/presentation/providers/constants/schema'
import useUpdateResource from 'shared/hooks/useUpdateResource'
import { useState } from 'react'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
}

interface propsChangeStatus {
  mutationFeedback: () => void
  callbackSuccess?: (value: any) => void
}

function ChangeStatus(props: propsChangeStatus) {
  const { mutationFeedback } = props
  const { changeStatusCandidate, queryKey } = useGraphql()
  const { useCreateReturn, useFormReturn } = useUpdateResource<
    UpdateCandidateJobStatus,
    FormDataSchema
  >({
    mutationKey: [queryKey],
    queryString: changeStatusCandidate,
    defaultValues: {
      feedback: '',
    },
    resolver: yupResolver(schema),
    onSuccess: mutationFeedback,
  })

  const { formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useCreateReturn

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
  const [data, setData] = useState<UpdateCandidateJobStatus>()

  const { defaultValues, callbackSuccess } = props
  const { mutateCreateFeedback } = CreateFeedbackprops({ callbackSuccess })

  const { mutateChangeStatus, isPendingStatus } = ChangeStatus({
    callbackSuccess,
    mutationFeedback: () => {
      if (data?.feedback) {
        mutateCreateFeedback({
          ...getInfoData({ field: ['feedback', 'attachments'], object: data }),
          candidate_job_id: data.id,
        })
      } else {
        callbackSuccess?.(data)
      }
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
      let attachments =
        value?.attachments && Array.isArray(value?.attachments)
          ? value.attachments
          : []

      attachments = transformListArray(attachments, [
        'document_id',
        'document_name',
      ])

      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ...cloneDeep(value),
          attachments,
        },
      })
      setData(valueClone as UpdateCandidateJobStatus)
      mutateChangeStatus(
        removeInfoData({
          field: ['feedback', 'attachments'],
          object: valueClone,
        })
      )
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
