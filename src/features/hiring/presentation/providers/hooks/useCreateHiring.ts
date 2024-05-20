import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/jobs/domain/graphql/graphql'
import { HiringInput } from 'features/hiring/domain/interfaces'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { cloneDeep } from 'lodash'
import { getValueOfObj } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createHiringProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateHiring(props: createHiringProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess } = props;

  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues
    },
  })

  const { createJob, queryKey } = useGraphql()
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newHiringTeam: Omit<HiringInput, 'id'>) =>
      fetchGraphQL<BaseRecord>(createJob.query, {
        input: newHiringTeam,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      toastSuccess('create hiring success');
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = {
        ...cloneDeep(value),
        team: getValueOfObj({ key: 'id', obj: value.team })
      }

      // mutate(value)
    })()
  }

  return {
    onSubmit,
    useFormReturn: {
      ...useFormReturn,
    },
  }
}

export default useCreateHiring
