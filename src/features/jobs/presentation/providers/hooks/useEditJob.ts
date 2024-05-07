import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { FormDataSchemaUpdate, schemaUpdate } from '../../providers/constants/schema'
import {
  UpdateHiringJobInput,
} from 'features/jobs/domain/interfaces'
import _ from 'lodash'
import { getValueOfObj } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createJobProps {
  defaultValues?: Partial<FormDataSchemaUpdate>
  callbackSuccess?: (value: any) => void
}

function useUpdateJob(props: createJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchemaUpdate>({
    resolver: yupResolver(schemaUpdate),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { updateJob, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newJob: UpdateHiringJobInput) => {
      const { id, ...otherValue } = newJob
      return fetchGraphQL<BaseRecord>(updateJob.query, {
        input: otherValue,
        id: id,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Update successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchemaUpdate) => {

      const valueClone = {
        ..._.cloneDeep(value),
        currency: getValueOfObj({ key: 'value', obj: value.currency }),
        location: getValueOfObj({ key: 'value', obj: value.location }),
        salary_type: getValueOfObj({ key: 'value', obj: value.salary_type }),
        team_id: getValueOfObj({ key: 'id', obj: value.team_id }),
        created_by: getValueOfObj({ key: 'id', obj: value.created_by }),
      }
console.log("valueClone", valueClone)
      mutate(valueClone)
    })()
  }

  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useUpdateJob
