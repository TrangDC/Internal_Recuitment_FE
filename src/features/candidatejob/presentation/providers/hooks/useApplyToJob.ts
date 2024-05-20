import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidatejob/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { NewCandidateJobInput } from 'features/candidates/domain/interfaces'
import toastSuccess from 'shared/components/toast/toastSuccess'
import _ from 'lodash'
import { getValueOfObj, removeInfoData } from 'shared/utils/utils'

interface useApplyToJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useApplyToJob(
  props: useApplyToJobProps = { defaultValues: {} }
) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createCandidateJob, queryKey } = useGraphql()
  
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newApplyJob: NewCandidateJobInput) => {
      return fetchGraphQL<BaseRecord>(createCandidateJob.query, {
        input: newApplyJob,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      toastSuccess('Apply to Job successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
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

export default useApplyToJob