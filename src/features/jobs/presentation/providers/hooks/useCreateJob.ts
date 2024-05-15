import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../../providers/constants/schema'
import { NewHiringJobInput } from 'features/jobs/domain/interfaces'
import _ from 'lodash'
import { getValueOfObj } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'

interface createJobProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateJob(props: createJobProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  })

  const { createJob, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTodo: NewHiringJobInput) =>
      fetchGraphQL<BaseRecord>(createJob.query, {
        input: newTodo,
        note: "",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('Create successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const salary_type = getValueOfObj({ key: 'value', obj: value.salary_type });
      
      const valueClone = {
        ..._.cloneDeep(value),
        currency: salary_type !== SALARY_STATE.NEGOTITATION ? getValueOfObj({ key: 'value', obj: value.currency }) : CURRENCY_STATE.VND,
        location: getValueOfObj({ key: 'value', obj: value.location }),
        salary_type: salary_type,
        team_id: getValueOfObj({ key: 'id', obj: value.team_id }),
        created_by: getValueOfObj({ key: 'id', obj: value.created_by }),
        status: 'draft',
      }

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

export default useCreateJob
