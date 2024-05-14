import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schemaApplyJob, FormDataSchemaApplyJob } from '../constants/schema'
import { NewCandidateJobInput } from 'features/candidates/domain/interfaces'
import toastSuccess from 'shared/components/toast/toastSuccess'
import _ from 'lodash'
import { getValueOfObj, removeInfoData } from 'shared/utils/utils'

interface useChangeStatusProps {
  defaultValues?: Partial<FormDataSchemaApplyJob>
  callbackSuccess?: (value: any) => void
}

function useChangeStatus(
  props: useChangeStatusProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaApplyJob>({
    resolver: yupResolver(schemaApplyJob),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createCandidateJob, queryKey } = useGraphql()
  
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newCandidateJob: NewCandidateJobInput) => {
      const { attachments, ...otherValue } = newCandidateJob;
      return fetchGraphQL<BaseRecord>(createCandidateJob.query, {
        input: otherValue,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      toastSuccess('Change Status Job successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaApplyJob) => {
      const valueClone = removeInfoData({field: ['team_id'], object: {
        ..._.cloneDeep(value),
        hiring_job_id: getValueOfObj({obj: value.hiring_job_id, key: 'id'}),
        status: getValueOfObj({obj: value.status, key: 'value'}),
      }})

      mutate(valueClone as NewCandidateJobInput)
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