import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useGraphql from 'features/candidates/domain/graphql/graphql'
import { useForm } from 'react-hook-form'
import { fetchGraphQL } from 'services/graphql-services'
import { BaseRecord } from 'shared/interfaces'
import { schema, FormDataSchema } from '../constants/schema'
import { NewCandidateInput } from 'features/candidates/domain/interfaces'
import _ from 'lodash'
import { converDateToISOString } from 'shared/utils/utils'
import toastSuccess from 'shared/components/toast/toastSuccess'

interface createCandidateProps {
  defaultValues?: Partial<FormDataSchema>
  callbackSuccess?: (value: any) => void
}

function useCreateCandidate(props: createCandidateProps = { defaultValues: {} }) {
  const { defaultValues, callbackSuccess} = props
  const queryClient = useQueryClient()
  const { handleSubmit, ...useFormReturn } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues
    },
  })

  const { createCandidate, queryKey } = useGraphql()
  
  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: (newTodo: NewCandidateInput) =>
      fetchGraphQL<BaseRecord>(createCandidate.query, {
        input: newTodo,
        note: '',
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })

      toastSuccess('Create successfully')
      callbackSuccess && callbackSuccess(data)
    },
  })

  function onSubmit() {
    handleSubmit((value: FormDataSchema) => {
      const valueClone = {
        ..._.cloneDeep(value),
        dob: converDateToISOString(value.dob),
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

export default useCreateCandidate
