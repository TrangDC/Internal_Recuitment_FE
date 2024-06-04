import { yupResolver } from '@hookform/resolvers/yup'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import {
  schemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../constants/schema'
import { cloneDeep } from 'lodash'
import { getInfoData, removeInfoData, transformListArray } from 'shared/utils/utils'
import { NewCandidateJobFeedbackInput } from 'features/feedback/domain/interfaces'
import {
  FormDataSchema,
  schema,
} from 'features/feedback/presentation/providers/constants/schema'
import { useState } from 'react'
import { useCreateResource, useEditResource } from 'shared/hooks/crud-hook'
import { CandidateJob, UpdateCandidateJobStatus, UpdateStatus } from 'features/candidatejob/domain/interfaces'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaChangeStatus>
  callbackSuccess?: (value: any) => void
  id: string,
}

interface propsChangeStatus {
  mutationFeedback: () => void
  callbackSuccess?: (value: any) => void
  id: string,
}

function ChangeStatus(props: propsChangeStatus) {
  const { mutationFeedback, id } = props
  const { changeStatusCandidate, queryKey, getCandidateJob } = useGraphql()
  const { useEditReturn, useFormReturn } = useEditResource<
    CandidateJob,
    FormDataSchema,
    UpdateStatus
  >({
    resolver: yupResolver(schema),
    editBuildQuery: changeStatusCandidate,
    oneBuildQuery: getCandidateJob,
    queryKey: [queryKey],
    id,
    onSuccess: mutationFeedback,
  })

  const { formState } = useFormReturn
  const isValid = !formState.isValid
  const { isPending, mutate } = useEditReturn

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

function useChangeStatus(props: useChangeStatusProps) {
  const [data, setData] = useState<UpdateCandidateJobStatus>()

  const { defaultValues, callbackSuccess, id } = props
  const { mutateCreateFeedback } = CreateFeedbackprops({ callbackSuccess })

  const { mutateChangeStatus, isPendingStatus } = ChangeStatus({
    id: id,
    callbackSuccess,
    mutationFeedback: () => {
      if (data?.feedback) {
        mutateCreateFeedback({
          ...getInfoData({ field: ['feedback', 'attachments'], object: data }),
          candidate_job_id: id,
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
        note: '',
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
          object: valueClone
        }) as UpdateStatus
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
