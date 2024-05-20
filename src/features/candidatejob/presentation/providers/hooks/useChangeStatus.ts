import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import {
  chemaChangeStatus,
  FormDataSchemaChangeStatus,
} from '../constants/schema'
import {
  UpdateCandidateJobStatus,
} from 'features/candidates/domain/interfaces'
import toastSuccess from 'shared/components/toast/toastSuccess'
import _, { isEmpty } from 'lodash'
import { getValueOfObj, removeInfoData } from 'shared/utils/utils'

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

  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (updateStatusJob: UpdateCandidateJobStatus) => {
      const { id, status } = updateStatusJob
      return fetchGraphQL<BaseRecord>(changeStatusCandidate.query, {
        id,
        status,
      })
    },
    onSuccess: (data, params) => {
      toastSuccess('Change Status Job successfully')
      if (params.feedback || !isEmpty(params.attachments)) {
        mutationFeedback && mutationFeedback(params as UpdateCandidateJobStatus)
        return
      }

      queryClient.invalidateQueries({ queryKey: [queryKey] })
      callbackSuccess && callbackSuccess(data)
    },
  })

  return {
    mutateChangeStatus: mutate,
  }
}

function CreateFeedbackprops(
  props: Pick<useChangeStatusProps, 'callbackSuccess'> = {}
) {
  const { callbackSuccess } = props

  const queryClient = useQueryClient()
  const { createCandidateJobFeedback, queryKey } = useGraphql()

  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (createFeedBack: UpdateCandidateJobStatus) => {
      const { id, feedback, attachments } = createFeedBack
      return fetchGraphQL<BaseRecord>(createCandidateJobFeedback.query, {
        input: {
          candidate_job_id: id,
          feedback,
          attachments,
        },
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Create Feedback Candidate Job successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  return {
    mutateCreateFeedback: mutate,
  }
}

function useChangeStatus(props: useChangeStatusProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props
  const { mutateCreateFeedback } = CreateFeedbackprops({ callbackSuccess })
  const { mutateChangeStatus } = ChangeStatus({
    callbackSuccess,
    mutationFeedback: (data: UpdateCandidateJobStatus) => {
      mutateCreateFeedback(data)
    },
  })

  const { handleSubmit, ...useFormReturn } =
    useForm<FormDataSchemaChangeStatus>({
      resolver: yupResolver(chemaChangeStatus),
      defaultValues: {
        ...defaultValues,
      },
    })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaChangeStatus) => {
      const valueClone = removeInfoData({
        field: ['team_id'],
        object: {
          ..._.cloneDeep(value),
          status: getValueOfObj({ obj: value.status, key: 'value' }),
        },
      })

      mutateChangeStatus(valueClone as UpdateCandidateJobStatus)
    })()
  }

  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useChangeStatus
