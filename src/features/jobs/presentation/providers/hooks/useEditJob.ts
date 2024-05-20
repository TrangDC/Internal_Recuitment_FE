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
import { convertCurrencyToNumber, getValueOfObj, removeInfoData } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'
import { CURRENCY_STATE, SALARY_STATE } from 'shared/constants/constants'

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
      const { id, note, ...otherValue } = newJob
      return fetchGraphQL<BaseRecord>(updateJob.query, {
        input: otherValue,
        id: id,
        note: note,
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
      const salary_type = getValueOfObj({ key: 'value', obj: value.salary_type });

      const valueClone = {
        ..._.cloneDeep(value),
        currency: salary_type !== SALARY_STATE.NEGOTITATION ? getValueOfObj({ key: 'value', obj: value.currency }) : CURRENCY_STATE.VND,
        location: getValueOfObj({ key: 'value', obj: value.location }),
        salary_type: salary_type,
        team_id: getValueOfObj({ key: 'id', obj: value.team_id }),
        salary_from: convertCurrencyToNumber(value.salary_from),
        salary_to: convertCurrencyToNumber(value.salary_to),
        created_by: getValueOfObj({ key: 'id', obj: value.created_by }),
      }

      mutate(removeInfoData({field: ["total_candidates_recruited"], object: valueClone}) as UpdateHiringJobInput)
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
